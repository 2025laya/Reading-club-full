// const express = require("express");
// const router = express.Router();

// const auth = require("../middleware/auth");

// const User = require("../models/User");
// const Book = require("../models/book");
// const Report = require("../models/Report");


// // =====================================================
// // GET USERS AND BOOKS FOR REPORT
// // =====================================================

// router.get("/targets", auth, async (req, res) => {
//     try {

//         // =========================
//         // GET USERS
//         // =========================

//         const users = await User.find({
//             role: {
//                 $ne: "admin"
//             }
//         })
//             .select("_id name lastName username email")
//             .sort({ name: 1 });


//         // =========================
//         // GET BOOKS
//         // =========================

//         const books = await Book.find()
//             .select("_id title author category cover")
//             .sort({ title: 1 });


//         // =========================
//         // RESPONSE
//         // =========================

//         res.json({
//             users,
//             books
//         });

//     } catch (error) {

//         console.error(
//             "GET REPORT TARGETS ERROR:",
//             error
//         );

//         res.status(500).json({
//             msg: "Cannot load users or books"
//         });
//     }
// });


// // =====================================================
// // SEND REPORT
// // =====================================================

// router.post("/", auth, async (req, res) => {
//     try {

//         const {
//             targetType,
//             targetId,
//             reason
//         } = req.body;


//         // =========================
//         // VALIDATE TYPE
//         // =========================

//         if (
//             !targetType ||
//             !["user", "book"].includes(targetType)
//         ) {
//             return res.status(400).json({
//                 msg: "Invalid report type"
//             });
//         }


//         // =========================
//         // VALIDATE TARGET ID
//         // =========================

//         if (!targetId) {
//             return res.status(400).json({
//                 msg: "Please select a user or book"
//             });
//         }


//         // =========================
//         // VALIDATE REASON
//         // =========================

//         if (
//             !reason ||
//             !reason.trim()
//         ) {
//             return res.status(400).json({
//                 msg: "Please write your complaint"
//             });
//         }


//         // =========================
//         // CHECK VALID OBJECT ID
//         // =========================

//         if (!require("mongoose").Types.ObjectId.isValid(targetId)) {
//             return res.status(400).json({
//                 msg: "Invalid target ID"
//             });
//         }


//         // =========================
//         // CHECK USER
//         // =========================

//         if (targetType === "user") {

//             const user = await User.findById(targetId);

//             if (!user) {
//                 return res.status(404).json({
//                     msg: "Reported user not found"
//                 });
//             }

//             // منع الإبلاغ عن المدير
//             if (user.role === "admin") {
//                 return res.status(400).json({
//                     msg: "You cannot report an admin"
//                 });
//             }
//         }


//         // =========================
//         // CHECK BOOK
//         // =========================

//         if (targetType === "book") {

//             const book = await Book.findById(targetId);

//             if (!book) {
//                 return res.status(404).json({
//                     msg: "Reported book not found"
//                 });
//             }
//         }


//         // =========================
//         // CREATE REPORT
//         // =========================

//         const report = new Report({
//             reporterId: req.user.id,

//             targetType: targetType,

//             targetId: targetId,

//             reason: reason.trim(),

//             status: "pending"
//         });


//         await report.save();
//         // =========================
//         // RESPONSE
//         // =========================

//         res.status(201).json({
//             msg: "Report sent successfully",
//             report
//         });

//     } catch (error) {

//         console.error(
//             "SEND REPORT ERROR:",
//             error
//         );

//         res.status(500).json({
//             msg: "Cannot send the report",
//             error: error.message
//         });
//     }
// });


// // =====================================================
// // GET ALL REPORTS FOR ADMIN
// // =====================================================

// router.get("/admin", auth, async (req, res) => {
//     try {

//         // =========================
//         // CHECK ADMIN
//         // =========================

//         if (req.user.role !== "admin") {
//             return res.status(403).json({
//                 msg: "Admin access required"
//             });
//         }


//         // =========================
//         // GET REPORTS
//         // =========================

//         const reports = await Report.find()
//             .populate(
//                 "reporterId",
//                 "name lastName username email"
//             )
//             .sort({
//                 createdAt: -1
//             });


//         // =========================
//         // GET TARGET DATA
//         // =========================

//         const formattedReports = await Promise.all(
//             reports.map(async (report) => {

//                 const data = report.toObject();

//                 let target = null;
//                 let targetName = null;


//                 // =========================
//                 // USER REPORT
//                 // =========================

//                 if (report.targetType === "user") {

//                     target = await User.findById(
//                         report.targetId
//                     ).select(
//                         "name lastName username email role status"
//                     );


//                     if (target) {

//                         targetName =
//                             `${target.name || ""} ${target.lastName || ""}`.trim();

//                         if (!targetName) {
//                             targetName =
//                                 target.username ||
//                                 target.email;
//                         }
//                     }
//                 }


//                 // =========================
//                 // BOOK REPORT
//                 // =========================

//                 if (report.targetType === "book") {

//                     target = await Book.findById(
//                         report.targetId
//                     ).select(
//                         "title author category cover status"
//                     );


//                     if (target) {
//                         targetName = target.title;
//                     }
//                 }


//                 return {
//                     ...data,

//                     targetId: report.targetId,

//                     targetType: report.targetType,

//                     target,

//                     targetName
//                 };
//             })
//         );


//         // =========================
//         // RESPONSE
//         // =========================

//         res.json(formattedReports);

//     } catch (error) {

//         console.error(
//             "GET ADMIN REPORTS ERROR:",
//             error
//         );

//         res.status(500).json({
//             msg: "Cannot load reports"
//         });
//     }
// });


// // =====================================================
// // GET SINGLE REPORT
// // =====================================================

// router.get("/:id", auth, async (req, res) => {
//     try {

//         if (req.user.role !== "admin") {
//             return res.status(403).json({
//                 msg: "Admin access required"
//             });
//         }


//         const report = await Report.findById(
//             req.params.id
//         ).populate(
//             "reporterId",
//             "name lastName username email"
//         );
//         if (!report) {
//             return res.status(404).json({
//                 msg: "Report not found"
//             });
//         }


//         let target = null;


//         if (report.targetType === "user") {

//             target = await User.findById(
//                 report.targetId
//             ).select(
//                 "name lastName username email role status"
//             );
//         }


//         if (report.targetType === "book") {

//             target = await Book.findById(
//                 report.targetId
//             ).select(
//                 "title author category cover status"
//             );
//         }


//         res.json({
//             ...report.toObject(),
//             target
//         });

//     } catch (error) {

//         console.error(
//             "GET SINGLE REPORT ERROR:",
//             error
//         );

//         res.status(500).json({
//             msg: "Cannot load report"
//         });
//     }
// });


// // =====================================================
// // UPDATE REPORT STATUS
// // =====================================================

// router.put("/:id/status", auth, async (req, res) => {
//     try {

//         if (req.user.role !== "admin") {
//             return res.status(403).json({
//                 msg: "Admin access required"
//             });
//         }


//         const {
//             status
//         } = req.body;


//         const allowedStatuses = [
//             "pending",
//             "reviewing",
//             "resolved",
//             "rejected"
//         ];


//         if (!allowedStatuses.includes(status)) {
//             return res.status(400).json({
//                 msg: "Invalid report status"
//             });
//         }


//         const report = await Report.findById(
//             req.params.id
//         );


//         if (!report) {
//             return res.status(404).json({
//                 msg: "Report not found"
//             });
//         }


//         report.status = status;

//         await report.save();


//         res.json({
//             msg: "Report status updated successfully",
//             report
//         });

//     } catch (error) {

//         console.error(
//             "UPDATE REPORT STATUS ERROR:",
//             error
//         );

//         res.status(500).json({
//             msg: "Cannot update report status"
//         });
//     }
// });


// // =====================================================
// // REJECT REPORT
// // =====================================================

// router.put("/:id/reject", auth, async (req, res) => {
//     try {

//         if (req.user.role !== "admin") {
//             return res.status(403).json({
//                 msg: "Admin access required"
//             });
//         }


//         const report = await Report.findById(
//             req.params.id
//         );


//         if (!report) {
//             return res.status(404).json({
//                 msg: "Report not found"
//             });
//         }


//         report.status = "rejected";

//         await report.save();


//         res.json({
//             msg: "Report rejected successfully",
//             report
//         });

//     } catch (error) {

//         console.error(
//             "REJECT REPORT ERROR:",
//             error
//         );

//         res.status(500).json({
//             msg: "Cannot reject report"
//         });
//     }
// });


// // =====================================================
// // RESOLVE REPORT
// // =====================================================

// router.put("/:id/resolve", auth, async (req, res) => {
//     try {

//         if (req.user.role !== "admin") {
//             return res.status(403).json({
//                 msg: "Admin access required"
//             });
//         }


//         const report = await Report.findById(
//             req.params.id
//         );


//         if (!report) {
//             return res.status(404).json({
//                 msg: "Report not found"
//             });
//         }


//         // =========================
//         // RESOLVE BOOK REPORT
//         // =========================

//         if (report.targetType === "book") {

//             const book = await Book.findById(
//                 report.targetId
//             );


//             if (book) {
//                 const UserBookAction =
//                     require("../models/UserBookAction");


//                 await UserBookAction.deleteMany({
//                     bookId: book._id
//                 });


//                 await Book.findByIdAndDelete(
//                     book._id
//                 );
//             }
//         }


//         // =========================
//         // RESOLVE USER REPORT
//         // =========================

//         if (report.targetType === "user") {

//             const user = await User.findById(
//                 report.targetId
//             );


//             if (user) {

//                 if (user.role === "admin") {
//                     return res.status(400).json({
//                         msg: "You cannot delete an admin"
//                     });
//                 }


//                 const UserBookAction =
//                     require("../models/UserBookAction");


//                 await UserBookAction.deleteMany({
//                     userId: user._id
//                 });


//                 await User.findByIdAndDelete(
//                     user._id
//                 );
//             }
//         }


//         // =========================
//         // UPDATE STATUS
//         // =========================

//         report.status = "resolved";

//         await report.save();


//         res.json({
//             msg: "Report resolved successfully",
//             report
//         });

//     } catch (error) {

//         console.error(
//             "RESOLVE REPORT ERROR:",
//             error
//         );

//         res.status(500).json({
//             msg: "Cannot resolve report"
//         });
//     }
// });


// module.exports = router;
// const express = require("express");
// const router = express.Router();

// const auth = require("../middleware/auth");

// const User = require("../models/User");
// const Book = require("../models/book");
// const Report = require("../models/Report");


// // =====================================================
// // GET USERS AND BOOKS
// // =====================================================

// router.get("/targets", auth, async (req, res) => {
//     try {

//         const users = await User.find({
//             role: { $ne: "admin" }
//         })
//             .select("_id name lastName username email")
//             .sort({ name: 1 });

//         const books = await Book.find()
//             .select("_id title author category")
//             .sort({ title: 1 });

//         res.status(200).json({
//             users,
//             books
//         });

//     } catch (error) {

//         console.error("GET REPORT TARGETS ERROR:", error);

//         res.status(500).json({
//             msg: "Cannot load users or books"
//         });
//     }
// });


// =====================================================
// SEND REPORT
// =====================================================

const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth");

const User = require("../models/User");
const Book = require("../models/book");
const Report = require("../models/Report");


// =====================================================
// GET USERS AND BOOKS
// =====================================================

router.get("/targets", auth, async (req, res) => {
    try {

        const users = await User.find({
            role: { $ne: "admin" }
        })
            .select("_id name lastName username email")
            .sort({ name: 1 });


        const books = await Book.find()
            .select("_id title author category")
            .sort({ title: 1 });


        res.json({
            users,
            books
        });

    } catch (error) {

        console.error(
            "GET REPORT TARGETS ERROR:",
            error
        );

        res.status(500).json({
            msg: "Cannot load users or books"
        });
    }
});


// =====================================================
// SEND REPORT
// =====================================================

router.post("/", auth, async (req, res) => {

    try {

        const {
            targetType,
            targetId,
            reason
        } = req.body;


        // =========================
        // CHECK TYPE
        // =========================

        if (
            !targetType ||
            !["user", "book"].includes(targetType)
        ) {
            return res.status(400).json({
                msg: "Invalid report type"
            });
        }


        // =========================
        // CHECK TARGET
        // =========================

        if (!targetId) {
            return res.status(400).json({
                msg: "Please select a user or book"
            });
        }


        // =========================
        // CHECK REASON
        // =========================

        if (!reason || !reason.trim()) {
            return res.status(400).json({
                msg: "Please write your complaint"
            });
        }


        // =========================
        // CHECK USER
        // =========================

        if (targetType === "user") {

            const user = await User.findById(targetId);

            if (!user) {
                return res.status(404).json({
                    msg: "Reported user not found"
                });
            }
        }


        // =========================
        // CHECK BOOK
        // =========================

        if (targetType === "book") {

            const book = await Book.findById(targetId);

            if (!book) {
                return res.status(404).json({
                    msg: "Reported book not found"
                });
            }
        }


        // =========================
        // CREATE REPORT
        // =========================

        const report = new Report({

            reporterId: req.user.id,

            targetType: targetType,

            targetId: targetId,

            reason: reason.trim(),

            status: "pending"

        });


        await report.save();


        // =========================
        // SUCCESS
        // =========================

        res.status(201).json({

            msg: "Report sent successfully",

            report

        });

    } catch (error) {

        console.error(
            "SEND REPORT ERROR:",
            error
        );

        res.status(500).json({
            msg: "Cannot send the report"
        });
    }

});


module.exports = router;