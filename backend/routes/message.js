const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth");
const Message = require("../models/message");

// =====================================================
// إضافة رسالة
// =====================================================

router.post("/", auth, async (req, res) => {
    try {
        const { text } = req.body;

        const message = new Message({
            text,
            sender: req.user.id
        });

        await message.save();

        const populatedMessage =
            await message.populate(
                "sender",
                "name email avatar"
            );

        req.app
            .get("io")
            .emit(
                "receiveMessage",
                populatedMessage
            );

        res.status(201).json(
            populatedMessage
        );

    } catch (err) {
        console.error(
            err.message
        );

        res.status(500).send(
            "server error"
        );
    }
});

// =====================================================
// جلب الرسائل
// =====================================================

router.get("/", auth, async (req, res) => {
    try {
        const messages =
            await Message.find()
                .populate(
                    "sender",
                    "name email avatar"
                )
                .sort({
                    createdAt: 1
                });

        res.json(messages);

    } catch (err) {
        console.error(
            err.message
        );

        res.status(500).send(
            "server error"
        );
    }
});

// =====================================================
// تعديل رسالة
// =====================================================

router.put("/:id", auth, async (req, res) => {
    try {
        const { text } = req.body;

        const message =
            await Message.findById(
                req.params.id
            );

        if (!message) {
            return res.status(404).json({
                msg: "Message not found"
            });
        }

        // =================================================
        // صاحب الرسالة أو Admin
        // =================================================

        if (
            message.sender.toString() !==
                req.user.id &&
            req.user.role !== "admin"
        ) {
            return res.status(403).json({
                msg: "Not authorized"
            });
        }

        if (text) {
            message.text = text;
        }

        await message.save();

        const populatedMessage =
            await message.populate(
                "sender",
                "name email avatar"
            );

        // إرسال التعديل لجميع المتصلين
        req.app
            .get("io")
            .emit(
                "messageUpdated",
                populatedMessage
            );

        res.json(
            populatedMessage
        );

    } catch (err) {
        console.error(
            err.message
        );

        res.status(500).send(
            "server error"
        );
    }
});

// =====================================================
// حذف رسالة
// =====================================================

router.delete("/:id", auth, async (req, res) => {
    try {
        const message =
            await Message.findById(
                req.params.id
            );

        if (!message) {
            return res.status(404).json({
                msg: "Message not found"
            });
        }

        // =================================================
        // صاحب الرسالة أو Admin
        // =================================================

        if (
            message.sender.toString() !==
                req.user.id &&
            req.user.role !== "admin"
        ) {
            return res.status(403).json({
                msg: "Not authorized"
            });
        }

        await message.deleteOne();
        // إرسال الحذف لجميع المتصلين
        req.app
            .get("io")
            .emit(
                "messageDeleted",
                message._id
            );

        res.json({
            msg:
                "Message removed successfully"
        });

    } catch (err) {
        console.error(
            err.message
        );

        res.status(500).send(
            "server error"
        );
    }
});

module.exports = router;