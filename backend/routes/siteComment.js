const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth");
const SiteComment = require("../models/SiteComment");
const SiteRating = require("../models/SiteRating");


// =====================================================
// جلب جميع التعليقات
// =====================================================
router.get("/", async (req, res) => {
    try {
console.log("🔥 SITE COMMENTS ROUTE REACHED");
        const comments =
            await SiteComment.find()
                .populate(
                    "userId",
                    "name lastName email avatar"
                )
                .sort({
                    createdAt: -1
                });

        res.json(comments);

    } catch (err) {

        console.error(
            "GET COMMENTS ERROR:",
            err
        );

        res.status(500).json({
            msg: "Server error"
        });
    }
});


// =====================================================
// إضافة تعليق + تحديث تقييم المستخدم
// =====================================================
router.post("/", auth, async (req, res) => {
    try {

        const {
            text,
            rating
        } = req.body;


        const numericRating =
            Number(rating);


        // التحقق من التقييم
        if (
            rating === undefined ||
            rating === null ||
            Number.isNaN(numericRating) ||
            numericRating < 1 ||
            numericRating > 5
        ) {

            return res.status(400).json({
                msg:
                    "Rating must be between 1 and 5"
            });
        }


        const commentText =
            typeof text === "string"
                ? text.trim()
                : "";


        // من 1 إلى 4 يجب كتابة تعليق
        if (
            numericRating < 5 &&
            !commentText
        ) {

            return res.status(400).json({
                msg:
                    "Comment text is required for ratings below 5"
            });
        }


        // 50 حرف كحد أقصى
        if (
            commentText.length > 50
        ) {

            return res.status(400).json({
                msg:
                    "Comment must not exceed 50 characters"
            });
        }


        // =================================================
        // إنشاء التعليق
        // =================================================
        const comment =
            new SiteComment({
                userId:
                    req.user.id,

                text:
                    commentText,

                rating:
                    numericRating
            });


        await comment.save();


        // =================================================
        // إضافة أو تعديل تقييم الموقع
        // =================================================
        let siteRating =
            await SiteRating.findOne({
                userId:
                    req.user.id
            });


        if (siteRating) {

            siteRating.rating =
                numericRating;

        } else {

            siteRating =
                new SiteRating({
                    userId:
                        req.user.id,

                    rating:
                        numericRating
                });
        }


        await siteRating.save();


        // =================================================
        // إرجاع التعليق مع بيانات صاحبه
        // =================================================
        const populatedComment =
            await SiteComment.findById(
                comment._id
            )
            .populate(
                "userId",
                "name lastName email avatar"
            );


        res.status(201).json({

            msg:
                "Comment added successfully",

            comment:
                populatedComment
        });


    } catch (err) {

        console.error(
            "ADD COMMENT ERROR:",
            err
        );
        res.status(500).json({
            msg:
                "Server error"
        });
    }
});


// =====================================================
// تعديل تعليق
// =====================================================
router.put("/:id", auth, async (req, res) => {
    try {

        const comment =
            await SiteComment.findById(
                req.params.id
            );


        if (!comment) {

            return res.status(404).json({
                msg:
                    "Comment not found"
            });
        }


        // =================================================
        // صاحب التعليق فقط
        // =================================================
        if (
            String(comment.userId) !==
            String(req.user.id)
        ) {

            return res.status(403).json({
                msg:
                    "Not authorized"
            });
        }


        const {
            text,
            rating
        } = req.body;


        const numericRating =
            Number(rating);


        if (
            rating === undefined ||
            rating === null ||
            Number.isNaN(numericRating) ||
            numericRating < 1 ||
            numericRating > 5
        ) {

            return res.status(400).json({
                msg:
                    "Rating must be between 1 and 5"
            });
        }


        const commentText =
            typeof text === "string"
                ? text.trim()
                : "";


        // من 1 إلى 4 يجب كتابة تعليق
        if (
            numericRating < 5 &&
            !commentText
        ) {

            return res.status(400).json({
                msg:
                    "Comment text is required for ratings below 5"
            });
        }


        if (
            commentText.length > 50
        ) {

            return res.status(400).json({
                msg:
                    "Comment must not exceed 50 characters"
            });
        }


        // =================================================
        // تحديث التعليق
        // =================================================
        comment.text =
            commentText;

        comment.rating =
            numericRating;


        await comment.save();


        // =================================================
        // تحديث تقييم الموقع
        // =================================================
        let siteRating =
            await SiteRating.findOne({
                userId:
                    req.user.id
            });


        if (siteRating) {

            siteRating.rating =
                numericRating;

        } else {

            siteRating =
                new SiteRating({
                    userId:
                        req.user.id,

                    rating:
                        numericRating
                });
        }


        await siteRating.save();


        // =================================================
        // إعادة التعليق مع بيانات المستخدم
        // =================================================
        const populatedComment =
            await SiteComment.findById(
                comment._id
            )
            .populate(
                "userId",
                "name lastName email avatar"
            );


        res.json({

            msg:
                "Comment updated successfully",

            comment:
                populatedComment
        });


    } catch (err) {

        console.error(
            "UPDATE COMMENT ERROR:",
            err
        );

        res.status(500).json({
            msg:
                "Server error"
        });
    }
});


// =====================================================
// حذف تعليق
// =====================================================
router.delete("/:id", auth, async (req, res) => {
    try {

        const comment =
            await SiteComment.findById(
                req.params.id
            );


        if (!comment) {
            return res.status(404).json({
                msg:
                    "Comment not found"
            });
        }


        // =================================================
        // صاحب التعليق فقط يستطيع الحذف
        // =================================================
        if (
            String(comment.userId) !==
            String(req.user.id)
        ) {

            return res.status(403).json({
                msg:
                    "Not authorized"
            });
        }


        await comment.deleteOne();


        res.json({
            msg:
                "Comment deleted successfully"
        });


    } catch (err) {

        console.error(
            "DELETE COMMENT ERROR:",
            err
        );

        res.status(500).json({
            msg:
                "Server error"
        });
    }
});


module.exports = router;