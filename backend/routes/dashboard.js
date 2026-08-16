const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth");
const admin = require("../middleware/admin");

const User = require("../models/User");
const Book = require("../models/book");
const Report = require("../models/Report");
const UserBookAction = require("../models/UserBookAction");


router.get("/", auth, admin, async (req, res) => {
    try {

        // 1. إجمالي عدد المستخدمين
        const totalUsers = await User.countDocuments();


        // 2. إجمالي عدد الكتب
        const totalBooks = await Book.countDocuments();


        // 3. عدد المستخدمين النشطين
        const activeUsers = await User.countDocuments({
            isSuspended: false
        });


        // 4. عدد البلاغات المعلقة
        const pendingReports = await Report.countDocuments({
            status: "pending"
        });


        // 5. أكثر الكتب حفظًا
        const mostSavedBooks = await UserBookAction.aggregate([
            {
                $match: {
                    actionType: "save"
                }
            },
            {
                $group: {
                    _id: "$bookId",
                    saveCount: {
                        $sum: 1
                    }
                }
            },
            {
                $sort: {
                    saveCount: -1
                }
            },
            {
                $limit: 5
            },
            {
                $lookup: {
                    from: "books",
                    localField: "_id",
                    foreignField: "_id",
                    as: "book"
                }
            },
            {
                $unwind: "$book"
            },
            {
                $project: {
                    _id: 0,
                    book: {
                        _id: "$book._id",
                        title: "$book.title",
                        author: "$book.author"
                    },
                    saveCount: 1
                }
            }
        ]);


        // 6. أكثر الكتب تفضيلًا
        const mostFavoriteBooks = await UserBookAction.aggregate([
            {
                $match: {
                    actionType: "favorite"
                }
            },
            {
                $group: {
                    _id: "$bookId",
                    favoriteCount: {
                        $sum: 1
                    }
                }
            },
            {
                $sort: {
                    favoriteCount: -1
                }
            },
            {
                $limit: 5
            },
            {
                $lookup: {
                    from: "books",
                    localField: "_id",
                    foreignField: "_id",
                    as: "book"
                }
            },
            {
                $unwind: "$book"
            },
            {
                $project: {
                    _id: 0,
                    book: {
                        _id: "$book._id",
                        title: "$book.title",
                        author: "$book.author"
                    },
                    favoriteCount: 1
                }
            }
        ]);


        // 7. توزيع الكتب حسب التصنيف
        const booksByCategory = await Book.aggregate([
            {
                $group: {
                    _id: "$category",
                    count: {
                        $sum: 1
                    }
                }
            },
            {
                $sort: {
                    count: -1
                }
            }
        ]);


        // 8. نمو المستخدمين شهريًا
        const usersGrowth = await User.aggregate([
            {
                $group: {
                    _id: {year: {
                            $year: "$createdAt"
                        },
                        month: {
                            $month: "$createdAt"
                        }
                    },
                    count: {
                        $sum: 1
                    }
                }
            },
            {
                $sort: {
                    "_id.year": 1,
                    "_id.month": 1
                }
            }
        ]);


        // إرسال جميع بيانات الـ Dashboard
        res.json({
            statistics: {
                totalUsers,
                totalBooks,
                activeUsers,
                pendingReports
            },

            mostSavedBooks,
            mostFavoriteBooks,
            booksByCategory,
            usersGrowth
        });


    } catch (err) {
        console.error(err.message);

        res.status(500).json({
            msg: "Server error"
        });
    }
});


module.exports = router;