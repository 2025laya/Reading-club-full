const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const UserBookAction = require('../models/UserBookAction');
const Book = require('../models/Book');

// ─── حفظ كتاب ───────────────────────────────────────
router.post('/books/:bookId/save', auth, async (req, res) => {
  try {
    const { bookId } = req.params;
    const userId = req.user.id;

    const book = await Book.findById(bookId);
    if (!book) return res.status(404).json({ msg: 'الكتاب غير موجود' });

    const existing = await UserBookAction.findOne({
      userId, bookId, actionType: 'save'
    });
    if (existing) return res.status(400).json({ msg: 'الكتاب محفوظ مسبقاً' });

    await UserBookAction.create({ userId, bookId, actionType: 'save' });
    res.status(201).json({ msg: 'تم حفظ الكتاب بنجاح' });
  } catch (err) {
    console.error(err);
    if (err.code === 11000) {
      return res.status(400).json({ msg: 'الكتاب محفوظ بالفعل' });
    }
    res.status(500).json({ msg: 'خطأ في الخادم' });
  }
});

// ─── إلغاء حفظ كتاب ─────────────────────────────────
router.delete('/books/:bookId/save', auth, async (req, res) => {
  try {
    const { bookId } = req.params;
    const userId = req.user.id;

    const deleted = await UserBookAction.findOneAndDelete({
      userId, bookId, actionType: 'save'
    });
    if (!deleted) return res.status(404).json({ msg: 'الكتاب غير محفوظ' });

    res.json({ msg: 'تم إلغاء الحفظ' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'خطأ في الخادم' });
  }
});

// ─── إضافة إلى المفضلة ─────────────────────────────
router.post('/books/:bookId/favorite', auth, async (req, res) => {
  try {
    const { bookId } = req.params;
    const userId = req.user.id;

    const book = await Book.findById(bookId);
    if (!book) return res.status(404).json({ msg: 'الكتاب غير موجود' });

    const existing = await UserBookAction.findOne({
      userId, bookId, actionType: 'favorite'
    });
    if (existing) return res.status(400).json({ msg: 'الكتاب مفضل مسبقاً' });

    await UserBookAction.create({ userId, bookId, actionType: 'favorite' });
    await Book.findByIdAndUpdate(bookId, { $inc: { favoritesCount: 1 } });

    res.status(201).json({ msg: 'تمت إضافة الكتاب إلى المفضلة' });
  } catch (err) {
    console.error(err);
    if (err.code === 11000) {
      return res.status(400).json({ msg: 'الكتاب مفضل بالفعل' });
    }
    res.status(500).json({ msg: 'خطأ في الخادم' });
  }
});

// ─── إزالة من المفضلة ──────────────────────────────
router.delete('/books/:bookId/favorite', auth, async (req, res) => {
  try {
    const { bookId } = req.params;
    const userId = req.user.id;

    const deleted = await UserBookAction.findOneAndDelete({
      userId, bookId, actionType: 'favorite'
    });
    if (!deleted) return res.status(404).json({ msg: 'الكتاب غير موجود في المفضلة' });

    await Book.findByIdAndUpdate(bookId, { $inc: { favoritesCount: -1 } });

    res.json({ msg: 'تمت إزالة الكتاب من المفضلة' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'خطأ في الخادم' });
  }
});

// ─── جلب كتب المستخدم المحفوظة ─────────────────────
router.get('/saved-books', auth, async (req, res) => {
  try {
    const userId = req.user.id;
    const savedActions = await UserBookAction.find({
      userId, actionType: 'save'
    }).populate('bookId');

    const books = savedActions.map(a => a.bookId);
    res.json(books);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'خطأ في الخادم' });
  }
});

// ─── جلب مفضلات المستخدم ───────────────────────────
router.get('/favorites', auth, async (req, res) => {
  try {
    const userId = req.user.id;
    const favActions = await UserBookAction.find({
      userId, actionType: 'favorite'
    }).populate('bookId');

    const books = favActions.map(a => a.bookId);
    res.json(books);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'خطأ في الخادم' });
  }

  });
// @route   GET /api/user/books/:bookId/favorite-status
// @desc    معرفة حالة اللايك للمستخدم الحالي
// @access  Private
router.get('/books/:bookId/favorite-status', auth, async (req, res) => {
  try {
    const { bookId } = req.params;
    const userId = req.user.id;

    const existing = await UserBookAction.findOne({
      userId,
      bookId,
      actionType: 'favorite'
    });

    res.json({ isFavorited: !!existing });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'خطأ في الخادم' });
  }
});

module.exports = router;
