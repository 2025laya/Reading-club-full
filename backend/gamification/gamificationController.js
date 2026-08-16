const User = require("../models/User");

const assignBadges = require("./badgeService");

const getLeaderboard = require("./leaderboardService");

const UserBookAction = require('../models/UserBookAction');

const updateProgress = async (req, res) => {

  try {

    const user = await User.findById(req.params.id);

    user.booksRead += 1;

    user.points += 20;

    user.badges = assignBadges(user);

    await user.save();

    res.json({
      message: "تم تحديث التقدم",
      user
    });

  }  catch (err) {
  console.error("OPEN BOOK ERROR:", err);

  res.status(500).json({
    msg: "خطأ في الخادم",
    error: err.message
  });
}
};

const leaderboard = async (req, res) => {

  const users = await getLeaderboard();

  res.json(users);
};

const getUserGamification = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({
        message: "User not found"
      });
    }

    res.json({
      booksRead: user.booksRead,
      points: user.points,
      badges: user.badges
    });

  } catch (error) {
    res.status(500).json({
      error: error.message
    });
  }
};

const getMyGamification = async (req, res) => {
  try {
    const userId = req.user.id || req.user._id;

    console.log("MY USER ID:", userId);

    const user = await User.findById(userId);

    console.log("MY USER FROM DB:", user);

    if (!user) {
      return res.status(404).json({
        message: "User not found"
      });
    }

    return res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      booksRead: user.booksRead || 0,
      points: user.points || 0,
      badges: user.badges || []
    });

  } catch (error) {
    console.error("GET MY GAMIFICATION ERROR:", error);

    return res.status(500).json({
      error: error.message
    });
  }
};
const openBook = async (req, res) => {
  try {
    const userId = req.user.id || req.user._id;
    const { bookId } = req.params;

    console.log("USER ID:", userId);
    console.log("BOOK ID:", bookId);

    const existing = await UserBookAction.findOne({
      userId,
      bookId,
      actionType: "read"
    });

    if (existing) {
      return res.status(400).json({
        msg: "لقد قرأت هذا الكتاب مسبقًا ولا يمكنك الحصول على نقاط إضافية"
      });
    }

    await UserBookAction.create({
      userId,
      bookId,
      actionType: "read"
    });

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        msg: "المستخدم غير موجود"
      });
    }

    user.booksRead = (user.booksRead || 0) + 1;
    user.points = (user.points || 0) + 20;

    user.badges = assignBadges(user);

    await user.save();

    res.status(200).json({
      msg: "🎉 تم اعتبار الكتاب مقروءًا! حصلت على 20 نقطة",
      points: user.points,
      booksRead: user.booksRead,
      readingGoal: user.readingGoal || 12,
      badges: user.badges
    });

  } catch (err) {
    console.error("OPEN BOOK ERROR:", err);

    res.status(500).json({
      msg: "خطأ في الخادم",
      error: err.message
    });
  }
};


    





module.exports = {
  updateProgress,
  leaderboard,
  getUserGamification,
  getMyGamification,
  openBook
};