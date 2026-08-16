// const mongoose = require("mongoose");

// const reportSchema = new mongoose.Schema(
//     {
//         reporterId: {
//             type: mongoose.Schema.Types.ObjectId,
//             ref: "User",
//             required: true
//         },

//         targetType: {
//             type: String,
//             enum: ["user", "book"],
//             required: true
//         },

//         targetId: {
//             type: mongoose.Schema.Types.ObjectId,
//             required: true
//         },

//         reason: {
//             type: String,
//             required: true,
//             trim: true
//         },

//         status: {
//             type: String,
//             enum: [
//                 "pending",
//                 "reviewing",
//                 "resolved",
//                 "rejected"
//             ],
//             default: "pending"
//         },

//         createdAt: {
//             type: Date,
//             default: Date.now
//         }
//     }
// );

// module.exports = mongoose.model("Report", reportSchema);
const mongoose = require("mongoose");

const reportSchema = new mongoose.Schema({
    reporterId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    targetType: {
        type: String,
        enum: ["user", "book"],
        required: true
    },

    targetId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },

    reason: {
        type: String,
        required: true,
        trim: true
    },

    status: {
        type: String,
        enum: [
            "pending",
            "reviewing",
            "resolved",
            "rejected"
        ],
        default: "pending"
    },

    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("Report", reportSchema);