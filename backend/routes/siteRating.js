const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth");
const SiteRating = require("../models/SiteRating");


// إضافة أو تعديل تقييم الواجهة
router.post("/", auth, async (req, res) => {
    try {
        const { rating } = req.body;

        if (rating === undefined  || rating < 1 ||  rating > 5) {
            return res.status(400).json({
                msg: "Rating must be between 1 and 5"
            });
        }

        let siteRating = await SiteRating.findOne({
            userId: req.user.id
        });

        if (siteRating) {
            siteRating.rating = rating;
        } else {
            siteRating = new SiteRating({
                userId: req.user.id,
                rating
            });
        }

        await siteRating.save();

        res.json({
            msg: "Rating updated successfully",
            rating: siteRating.rating
        });

    } catch (err) {
        console.error(err.message);

        res.status(500).json({
            msg: "Server error"
        });
    }
});


// جلب متوسط تقييم الواجهة
router.get("/", async (req, res) => {
    try {
        const result = await SiteRating.aggregate([
            {
                $group: {
                    _id: null,
                    averageRating: {
                        $avg: "$rating"
                    },
                    totalRatings: {
                        $sum: 1
                    }
                }
            }
        ]);

        if (result.length === 0) {
            return res.json({
                averageRating: 0,
                totalRatings: 0
            });
        }

        res.json({
            averageRating: Number(result[0].averageRating.toFixed(1)),
            totalRatings: result[0].totalRatings
        });

    } catch (err) {
        console.error(err.message);

        res.status(500).json({
            msg: "Server error"
        });
    }
});


module.exports = router;