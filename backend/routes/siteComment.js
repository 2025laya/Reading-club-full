const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth");
const SiteComment = require("../models/SiteComment");


// عرض جميع تعليقات الواجهة
router.get("/", async (req, res) => {
    try {
        const comments = await SiteComment.find()
            .populate("userId", "name lastNamez")
            .sort({ createdAt: -1 });

        res.json(comments);

    } catch (err) {
        console.error(err.message);

        res.status(500).json({
            msg: "Server error"
        });
    }
});


// إضافة تعليق جديد
router.post("/", auth, async (req, res) => {
    try {
        const { text } = req.body;

        if (!text || !text.trim()) {
            return res.status(400).json({
                msg: "Comment text is required"
            });
        }

        const comment = new SiteComment({
            userId: req.user.id,
            text: text.trim()
        });

        await comment.save();

        await comment.populate("userId", "name lastName");

        res.status(201).json({
            msg: "Comment added successfully",
            comment
        });

    } catch (err) {
        console.error(err.message);

        res.status(500).json({
            msg: "Server error"
        });
    }
});


// تعديل تعليق
router.put("/:id", auth, async (req, res) => {
    try {
        const comment = await SiteComment.findById(req.params.id);

        if (!comment) {
            return res.status(404).json({
                msg: "Comment not found"
            });
        }

        // فقط صاحب التعليق يستطيع تعديله
        if (comment.userId.toString() !== req.user.id) {
            return res.status(401).json({
                msg: "Not authorized"
            });
        }

        const { text } = req.body;

        if (!text || !text.trim()) {
            return res.status(400).json({
                msg: "Comment text is required"
            });
        }

        comment.text = text.trim();

        await comment.save();

        await comment.populate("userId", "name lastName");

        res.json({
            msg: "Comment updated successfully",
            comment
        });

    } catch (err) {
        console.error(err.message);

        res.status(500).json({
            msg: "Server error"
        });
    }
});


// حذف تعليق
router.delete("/:id", auth, async (req, res) => {
    try {
        const comment = await SiteComment.findById(req.params.id);

        if (!comment) {
            return res.status(404).json({
                msg: "Comment not found"
            });
        }

        // فقط صاحب التعليق يستطيع حذفه
        if (comment.userId.toString() !== req.user.id) {
            return res.status(401).json({
                msg: "Not authorized"
            });
        }

        await comment.deleteOne();

        res.json({
            msg: "Comment deleted successfully"
        });

    } catch (err) {
        console.error(err.message);

        res.status(500).json({
            msg: "Server error"
        });
    }
});


module.exports = router;