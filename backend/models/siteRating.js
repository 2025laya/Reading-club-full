const mongoose = require("mongoose");

const siteRatingSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },

        rating: {
            type: Number,
            required: true,
            min: 1,
            max: 5
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("SiteRating", siteRatingSchema);
