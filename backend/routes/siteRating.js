const express = require("express");

const router =
    express.Router();

const auth =
    require("../middleware/auth");

const SiteRating =
    require("../models/SiteRating");


// =====================================================
// إضافة أو تعديل تقييم المستخدم
// =====================================================

router.post(
    "/",
    auth,
    async (req, res) => {

        try {

            const {
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


            res.json({

                msg:
                    "Rating updated successfully",

                rating:
                    siteRating.rating

            });


        } catch (err) {

            console.error(
                "POST SITE RATING ERROR:",
                err
            );


            res.status(500).json({
                msg:
                    "Server error"
            });
        }
    }
);


// =====================================================
// جلب متوسط التقييم
// =====================================================

router.get(
    "/",
    async (req, res) => {

        try {

            const result =
                await SiteRating.aggregate([

                    {
                        $group: {

                            _id:
                                null,

                            averageRating: {
                                $avg:
                                    "$rating"
                            },

                            totalRatings: {
                                $sum:
                                    1
                            }

                        }
                    }

                ]);


            if (
                result.length === 0
            ) {

                return res.json({

                    averageRating:
                        0,

                    totalRatings:
                        0

                });
            }


            res.json({

                averageRating:
                    Number(
                        result[0]
                            .averageRating
                            .toFixed(1)
                    ),

                totalRatings:
                    result[0]
                        .totalRatings

            });


        } catch (err) {

            console.error(
                "GET SITE RATING ERROR:",
                err
            );


            res.status(500).json({
                msg:
                    "Server error"
            });
        }
    }
);


module.exports =
    router;