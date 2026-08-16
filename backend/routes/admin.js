 const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth");
const admin = require("../middleware/admin");

const User = require("../models/User");
const Book = require("../models/book");
const Report = require("../models/Report");
const UserBookAction = require("../models/UserBookAction");

// =====================================================
// TEST ADMIN
// =====================================================

router.get("/test", auth, admin, (req, res) => {
    res.json({
        msg: "Admin access granted",
        user: req.user
    });
});

// =====================================================
// GET ALL USERS
// =====================================================

router.get("/users", auth, admin, async (req, res) => {
    try {
        const {
            search,
            role,
            from,
            to
        } = req.query;

        const filter = {};

        if (search) {
            filter.$or = [
                { name: { $regex: search, $options: "i" } },
                { lastName: { $regex: search, $options: "i" } },
                { email: { $regex: search, $options: "i" } }
            ];
        }

        if (role) {
            if (!["user", "admin"].includes(role)) {
                return res.status(400).json({
                    msg: "Invalid role"
                });
            }

            filter.role = role;
        }

        if (from) {
            filter.createdAt = {
                ...filter.createdAt,
                $gte: new Date(from)
            };
        }

        if (to) {
            const endDate = new Date(to);

            endDate.setHours(23, 59, 59, 999);

            filter.createdAt = {
                ...filter.createdAt,
                $lte: endDate
            };
        }

        const users = await User.find(filter)
            .select("-password")
            .sort({ createdAt: -1 });

        res.json(users);

    } catch (err) {
        console.error("GET USERS ERROR:", err);

        res.status(500).json({
            msg: "Server error"
        });
    }
});

// =====================================================
// GET USER BY ID
// =====================================================

router.get("/users/:id", auth, admin, async (req, res) => {
    try {
        const user = await User.findById(req.params.id)
            .select("-password");

        if (!user) {
            return res.status(404).json({
                msg: "User not found"
            });
        }

        const actions = await UserBookAction.find({
            userId: user._id
        })
            .populate("bookId")
            .sort({ createdAt: -1 });

        const savedBooks = actions
            .filter(action => action.actionType === "save")
            .map(action => action.bookId);

        const favoriteBooks = actions
            .filter(action => action.actionType === "favorite")
            .map(action => action.bookId);

        res.json({
            user,

            activity: {
                totalActions: actions.length,
                savedBooksCount: savedBooks.length,
                favoriteBooksCount: favoriteBooks.length
            },

            savedBooks,
            favoriteBooks
        });

    } catch (err) {
        console.error("GET USER ERROR:", err);

        res.status(500).json({
            msg: "Server error"
        });
    }
});

// =====================================================
// UPDATE USER
// =====================================================

router.put("/users/:id", auth, admin, async (req, res) => {
    try {
        const {
            name,
            lastName,
            email,
            role
        } = req.body;

        const user = await User.findById(req.params.id);

        if (!user) {
            return res.status(404).json({
                msg: "User not found"
            });
        }
if (name !== undefined) user.name = name;
        if (lastName !== undefined) user.lastName = lastName;
        if (email !== undefined) user.email = email;

        if (role !== undefined) {
            if (!["user", "admin"].includes(role)) {
                return res.status(400).json({
                    msg: "Invalid role"
                });
            }

            user.role = role;
        }

        await user.save();

        res.json({
            msg: "User updated successfully",
            user
        });

    } catch (err) {
        console.error("UPDATE USER ERROR:", err);

        if (err.code === 11000) {
            return res.status(400).json({
                msg: "Email already exists"
            });
        }

        res.status(500).json({
            msg: "Server error"
        });
    }
});

// =====================================================
// SUSPEND / UNSUSPEND USER
// =====================================================

router.put("/users/:id/suspend", auth, admin, async (req, res) => {
    try {
        const user = await User.findById(req.params.id);

        if (!user) {
            return res.status(404).json({
                msg: "User not found"
            });
        }

        if (user._id.toString() === req.user.id) {
            return res.status(400).json({
                msg: "Admin cannot suspend their own account"
            });
        }

        if (user.role === "admin") {
            return res.status(400).json({
                msg: "You cannot suspend an admin"
            });
        }

        user.status =
            user.status === "suspended"
                ? "active"
                : "suspended";

        await user.save();

        res.json({
            msg:
                user.status === "suspended"
                    ? "User suspended successfully"
                    : "User activated successfully",

            status: user.status,
            user
        });

    } catch (err) {
        console.error("SUSPEND USER ERROR:", err);

        res.status(500).json({
            msg: "Cannot change user status"
        });
    }
});

// =====================================================
// CHANGE USER ROLE
// =====================================================

router.put("/users/:id/role", auth, admin, async (req, res) => {
    try {
        const { role } = req.body;

        if (!["user", "admin"].includes(role)) {
            return res.status(400).json({
                msg: "Invalid role"
            });
        }

        const user = await User.findById(req.params.id);

        if (!user) {
            return res.status(404).json({
                msg: "User not found"
            });
        }

        if (user._id.toString() === req.user.id) {
            return res.status(400).json({
                msg: "Admin cannot change their own role"
            });
        }

        user.role = role;

        await user.save();

        res.json({
            msg:
                role === "admin"
                    ? "User promoted to admin successfully"
                    : "Admin role removed successfully",

            user: {
                id: user._id,
                name: user.name,
                lastName: user.lastName,
                email: user.email,
                role: user.role,
                status: user.status
            }
        });

    } catch (err) {
        console.error("CHANGE ROLE ERROR:", err);

        res.status(500).json({
            msg: "Cannot change user role"
        });
    }
});

// =====================================================
// DELETE USER
// =====================================================

router.delete("/users/:id", auth, admin, async (req, res) => {
    try {
        const user = await User.findById(req.params.id);

        if (!user) {
            return res.status(404).json({
                msg: "User not found"
            });
        }
 if (user.role === "admin") {
            return res.status(400).json({
                msg: "You cannot delete an admin"
            });
        }

        await UserBookAction.deleteMany({
            userId: user._id
        });

        await User.findByIdAndDelete(req.params.id);

        res.json({
            msg: "User deleted permanently"
        });

    } catch (error) {
        console.error("DELETE USER ERROR:", error);

        res.status(500).json({
            msg: "Server error"
        });
    }
});

// =====================================================
// GET ALL BOOKS
// =====================================================

router.get("/books", auth, admin, async (req, res) => {
    try {
        const {
            search,
            category,
            from,
            to,
            sortBy = "createdAt",
            order = "desc"
        } = req.query;

        const filter = {};

        if (search) {
            filter.$or = [
                {
                    title: {
                        $regex: search,
                        $options: "i"
                    }
                },
                {
                    author: {
                        $regex: search,
                        $options: "i"
                    }
                }
            ];
        }

        if (category) {
            filter.category = category;
        }

        if (from) {
            filter.createdAt = {
                ...filter.createdAt,
                $gte: new Date(from)
            };
        }

        if (to) {
            const endDate = new Date(to);

            endDate.setHours(23, 59, 59, 999);

            filter.createdAt = {
                ...filter.createdAt,
                $lte: endDate
            };
        }

        const allowedSortFields = [
            "title",
            "author",
            "createdAt"
        ];

        if (!allowedSortFields.includes(sortBy)) {
            return res.status(400).json({
                msg: "Invalid sort field"
            });
        }

        const sortOrder = order === "asc" ? 1 : -1;

        const books = await Book.find(filter)
            .sort({
                [sortBy]: sortOrder
            });

        res.json(books);

    } catch (err) {
        console.error("GET BOOKS ERROR:", err);

        res.status(500).json({
            msg: "Server error"
        });
    }
});

// =====================================================
// GET BOOK BY ID
// =====================================================

router.get("/books/:id", auth, admin, async (req, res) => {
    try {
        const book = await Book.findById(req.params.id);

        if (!book) {
            return res.status(404).json({
                msg: "Book not found"
            });
        }

        const saveCount = await UserBookAction.countDocuments({
            bookId: book._id,
            actionType: "save"
        });

        const favoriteCount = await UserBookAction.countDocuments({
            bookId: book._id,
            actionType: "favorite"
        });

        res.json({
            book,

            statistics: {
                saveCount,
                favoriteCount
            }
        });

    } catch (err) {
        console.error("GET BOOK ERROR:", err);

        res.status(500).json({
            msg: "Server error"
        });
    }
});

// =====================================================
// ADD BOOK
// =====================================================

router.post("/books", auth, admin, async (req, res) => {
    try {
        const {
            title,
            author,
            category,
            pdf,
            cover,
            audio,
            price,
            summary,
            description,
            isPaid,
            isbn,
            moods
        } = req.body;
 const newBook = new Book({
            title,
            author,
            category,
            pdf,
            cover,
            audio,
            price,
            summary,
            description,
            isPaid,
            isbn,
            moods,
            addedBy: req.user.id
        });

        await newBook.save();

        res.status(201).json({
            msg: "Book added successfully",
            book: newBook
        });

    } catch (err) {
        console.error("ADD BOOK ERROR:", err);

        if (err.code === 11000) {
            return res.status(400).json({
                msg: "ISBN already exists"
            });
        }

        res.status(500).json({
            msg: "Server error"
        });
    }
});

// =====================================================
// UPDATE BOOK
// =====================================================

router.put("/books/:id", auth, admin, async (req, res) => {
    try {
        const {
            title,
            author,
            category,
            pdf,
            cover,
            audio,
            price,
            summary,
            description,
            isPaid,
            isbn,
            moods
        } = req.body;

        const book = await Book.findById(req.params.id);

        if (!book) {
            return res.status(404).json({
                msg: "Book not found"
            });
        }

        if (title !== undefined) book.title = title;
        if (author !== undefined) book.author = author;
        if (category !== undefined) book.category = category;
        if (pdf !== undefined) book.pdf = pdf;
        if (cover !== undefined) book.cover = cover;
        if (audio !== undefined) book.audio = audio;
        if (price !== undefined) book.price = price;
        if (summary !== undefined) book.summary = summary;
        if (description !== undefined) book.description = description;
        if (isPaid !== undefined) book.isPaid = isPaid;
        if (isbn !== undefined) book.isbn = isbn;
        if (moods !== undefined) book.moods = moods;

        await book.save();

        res.json({
            msg: "Book updated successfully",
            book
        });

    } catch (err) {
        console.error("UPDATE BOOK ERROR:", err);

        if (err.code === 11000) {
            return res.status(400).json({
                msg: "ISBN already exists"
            });
        }

        res.status(500).json({
            msg: "Server error"
        });
    }
});

// =====================================================
// SUSPEND / UNSUSPEND BOOK
// =====================================================

router.put("/books/:id/suspend", auth, admin, async (req, res) => {
    try {
        const book = await Book.findById(req.params.id);

        if (!book) {
            return res.status(404).json({
                msg: "Book not found"
            });
        }

        book.status =
            book.status === "suspended"
                ? "active"
                : "suspended";

        await book.save();

        res.json({
            msg:
                book.status === "suspended"
                    ? "Book suspended temporarily"
                    : "Book activated again",

            status: book.status
        });

    } catch (error) {
        console.error("SUSPEND BOOK ERROR:", error);

        res.status(500).json({
            msg: "Cannot change book status"
        });
    }
});

// =====================================================
// DELETE BOOK
// =====================================================

router.delete("/books/:id", auth, admin, async (req, res) => {
    try {
        const book = await Book.findById(req.params.id);

        if (!book) {
            return res.status(404).json({
                msg: "Book not found"
            });
        }

        await UserBookAction.deleteMany({
            bookId: book._id
        });

        await Book.findByIdAndDelete(req.params.id);

        res.json({
            msg: "Book deleted successfully"
        });
 } catch (err) {
        console.error("DELETE BOOK ERROR:", err);

        res.status(500).json({
            msg: "Server error"
        });
    }
});

// =====================================================
// GET ALL REPORTS
// =====================================================

router.get("/reports", auth, async (req, res) => {
    try {
        // التأكد أن المستخدم Admin
        if (req.user.role !== "admin") {
            return res.status(403).json({
                msg: "Admin access required"
            });
        }

        // جلب جميع البلاغات
        const reports = await Report.find()
            .populate(
                "reporterId",
                "name lastName username email"
            )
            .sort({
                createdAt: -1
            });

        // تجهيز كل بلاغ
        const formattedReports = await Promise.all(
            reports.map(async (report) => {

                let target = null;
                let targetName = "Unknown";

                // =========================
                // إذا كان البلاغ عن مستخدم
                // =========================

                if (report.targetType === "user") {

                    target = await User.findById(
                        report.targetId
                    ).select(
                        "_id name lastName username email status role"
                    );

                    if (target) {
                        targetName =
                            `${target.name || ""} ${target.lastName || ""}`.trim();

                        if (!targetName) {
                            targetName =
                                target.username ||
                                target.email ||
                                "Unknown user";
                        }
                    }
                }

                // =========================
                // إذا كان البلاغ عن كتاب
                // =========================

                if (report.targetType === "book") {

                    target = await Book.findById(
                        report.targetId
                    ).select(
                        "_id title author category status"
                    );

                    if (target) {
                        targetName =
                            target.title ||
                            "Unknown book";
                    }
                }

                return {
                    _id: report._id,

                    reporterId: report.reporterId,

                    targetType: report.targetType,

                    targetId: target,

                    targetName: targetName,

                    reason: report.reason,

                    status: report.status,

                    createdAt: report.createdAt
                };
            })
        );

        res.json(formattedReports);

    } catch (error) {

        console.error(
            "GET REPORTS ERROR:",
            error
        );

        res.status(500).json({
            msg: "Cannot load reports"
        });
    }
});

// =====================================================
// GET SINGLE REPORT
// =====================================================

router.get("/reports/:id", auth, admin, async (req, res) => {
    try {
        const report = await Report.findById(req.params.id)
            .populate(
                "reporterId",
                "name lastName username email"
            )
            .populate(
                "targetUserId",
                "name lastName username email status"
            )
            .populate(
                "targetBookId",
                "title author category status"
            );

        if (!report) {
            return res.status(404).json({
                msg: "Report not found"
            });
        }

        let targetType = null;
        let target = null;

        if (report.targetUserId) {
            targetType = "user";
            target = report.targetUserId;
        } else if (report.targetBookId) {
            targetType = "book";
            target = report.targetBookId;
        }

        res.json({
            ...report.toObject(),
            targetType,
            target,
            targetId: target ? target._id : null
        });

    } catch (err) {
        console.error("GET REPORT ERROR:", err);

        res.status(500).json({
            msg: "Server error"
        });
    }
});

// =====================================================
// CHANGE REPORT STATUS
// =====================================================

router.put("/reports/:id/status", auth, admin, async (req, res) => {
    try {
        const { status } = req.body;

        const allowedStatuses = [
            "pending",
            "reviewing",
            "resolved",
            "rejected"
        ];

        if (!allowedStatuses.includes(status)) {
            return res.status(400).json({
                msg: "Invalid report status"
            });
        }

        const report = await Report.findById(req.params.id);

        if (!report) {
            return res.status(404).json({
                msg: "Report not found"
            });
        }

        report.status = status;

        await report.save();

        res.json({
            msg: "Report status updated successfully",
            report
        });

    } catch (err) {
        console.error("CHANGE REPORT STATUS ERROR:", err);

        res.status(500).json({
            msg: "Server error"
        });
    }
});
 // =====================================================
// RESOLVE REPORT
// =====================================================

router.put("/reports/:id/resolve", auth, admin, async (req, res) => {
    try {
        const report = await Report.findById(req.params.id);

        if (!report) {
            return res.status(404).json({
                msg: "Report not found"
            });
        }

        if (report.status === "resolved") {
            return res.status(400).json({
                msg: "Report already resolved"
            });
        }

        if (report.targetBookId) {
            const book = await Book.findById(
                report.targetBookId
            );

            if (!book) {
                return res.status(404).json({
                    msg: "Reported book not found"
                });
            }

            await UserBookAction.deleteMany({
                bookId: book._id
            });

            await Book.findByIdAndDelete(book._id);
        }

        if (report.targetUserId) {
            const reportedUser = await User.findById(
                report.targetUserId
            );

            if (!reportedUser) {
                return res.status(404).json({
                    msg: "Reported user not found"
                });
            }

            if (
                reportedUser._id.toString() ===
                req.user.id
            ) {
                return res.status(400).json({
                    msg: "Admin cannot delete their own account"
                });
            }

            if (reportedUser.role === "admin") {
                return res.status(400).json({
                    msg: "You cannot delete an admin"
                });
            }

            await UserBookAction.deleteMany({
                userId: reportedUser._id
            });

            await User.findByIdAndDelete(
                reportedUser._id
            );
        }

        report.status = "resolved";

        await report.save();

        res.json({
            msg: "Report resolved successfully",
            report
        });

    } catch (err) {
        console.error("RESOLVE REPORT ERROR:", err);

        res.status(500).json({
            msg: "Server error"
        });
    }
});

// =====================================================
// REJECT REPORT
// =====================================================

router.put("/reports/:id/reject", auth, admin, async (req, res) => {
    try {
        const report = await Report.findById(req.params.id);

        if (!report) {
            return res.status(404).json({
                msg: "Report not found"
            });
        }

        if (report.status === "rejected") {
            return res.status(400).json({
                msg: "Report already rejected"
            });
        }

        report.status = "rejected";

        await report.save();

        res.json({
            msg: "Report rejected successfully",
            report
        });

    } catch (err) {
        console.error("REJECT REPORT ERROR:", err);

        res.status(500).json({
            msg: "Server error"
        });
    }
});

// =====================================================
// USERS GROWTH
// =====================================================

router.get("/reports/users-growth", auth, admin, async (req, res) => {
    try {
        const { period = "monthly" } = req.query;

        let dateFormat;

        if (period === "daily") {
            dateFormat = "%Y-%m-%d";
        } else if (period === "weekly") {
            dateFormat = "%Y-%U";
        } else if (period === "monthly") {
            dateFormat = "%Y-%m";
        } else {
            return res.status(400).json({
                msg: "Invalid period"
            });
        }
 const report = await User.aggregate([
            {
                $group: {
                    _id: {
                        $dateToString: {
                            format: dateFormat,
                            date: "$createdAt"
                        }
                    },
                    count: {
                        $sum: 1
                    }
                }
            },
            {
                $sort: {
                    _id: 1
                }
            }
        ]);

        res.json(report);

    } catch (err) {
        console.error(err);

        res.status(500).json({
            msg: "Server error"
        });
    }
});

// =====================================================
// MOST ACTIVE USERS
// =====================================================

router.get("/reports/most-active-users", auth, admin, async (req, res) => {
    try {
        const { from, to } = req.query;

        const match = {};

        if (from || to) {
            match.createdAt = {};

            if (from) {
                match.createdAt.$gte = new Date(from);
            }

            if (to) {
                const endDate = new Date(to);

                endDate.setHours(23, 59, 59, 999);

                match.createdAt.$lte = endDate;
            }
        }

        const pipeline = [
            {
                $match: match
            },
            {
                $group: {
                    _id: "$userId",
                    activityCount: {
                        $sum: 1
                    }
                }
            },
            {
                $sort: {
                    activityCount: -1
                }
            },
            {
                $limit: 10
            },
            {
                $lookup: {
                    from: "users",
                    localField: "_id",
                    foreignField: "_id",
                    as: "user"
                }
            },
            {
                $unwind: "$user"
            },
            {
                $project: {
                    _id: 0,

                    user: {
                        _id: "$user._id",
                        name: "$user.name",
                        lastName: "$user.lastName",
                        email: "$user.email",
                        role: "$user.role",
                        status: "$user.status"
                    },

                    activityCount: 1
                }
            }
        ];

        const report = await UserBookAction.aggregate(
            pipeline
        );

        res.json(report);

    } catch (err) {
        console.error(err);

        res.status(500).json({
            msg: "Server error"
        });
    }
});

// =====================================================
// MOST INTERACTIVE BOOKS
// =====================================================

router.get(
    "/reports/most-interactive-books",
    auth,
    admin,
    async (req, res) => {
        try {
            const {
                from,
                to,
                category
            } = req.query;

            const match = {};

            if (from || to) {
                match.createdAt = {};

                if (from) {
                    match.createdAt.$gte = new Date(from);
                }

                if (to) {
                    const endDate = new Date(to);

                    endDate.setHours(23, 59, 59, 999);

                    match.createdAt.$lte = endDate;
                }
            }

            const pipeline = [
                {
                    $match: match
                },
                {
                    $group: {
                        _id: "$bookId",
                        interactions: {
 $sum: 1
                        }
                    }
                },
                {
                    $sort: {
                        interactions: -1
                    }
                },
                {
                    $limit: 10
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
                }
            ];

            if (category) {
                pipeline.push({
                    $match: {
                        "book.category": category
                    }
                });
            }

            pipeline.push({
                $project: {
                    _id: 0,

                    book: {
                        _id: "$book._id",
                        title: "$book.title",
                        author: "$book.author",
                        category: "$book.category"
                    },

                    interactions: 1
                }
            });

            const report = await UserBookAction.aggregate(
                pipeline
            );

            res.json(report);

        } catch (err) {
            console.error(err);

            res.status(500).json({
                msg: "Server error"
            });
        }
    }
);

// =====================================================
// RECENT BOOKS
// =====================================================

router.get("/reports/recent-books", auth, admin, async (req, res) => {
    try {
        const limit = Number(req.query.limit) || 10;

        const books = await Book.find()
            .sort({ createdAt: -1 })
            .limit(limit)
            .select(
                "title author category createdAt cover"
            );

        res.json(books);

    } catch (err) {
        console.error(err);

        res.status(500).json({
            msg: "Server error"
        });
    }
});

// =====================================================
// FAVORITES STATISTICS
// =====================================================

router.get("/reports/favorites", auth, admin, async (req, res) => {
    try {
        const {
            from,
            to,
            category
        } = req.query;

        const match = {
            actionType: "favorite"
        };

        if (from || to) {
            match.createdAt = {};

            if (from) {
                match.createdAt.$gte = new Date(from);
            }

            if (to) {
                const endDate = new Date(to);

                endDate.setHours(23, 59, 59, 999);

                match.createdAt.$lte = endDate;
            }
        }

        const pipeline = [
            {
                $match: match
            },
            {
                $lookup: {
                    from: "books",
                    localField: "bookId",
                    foreignField: "_id",
                    as: "book"
                }
            },
            {
                $unwind: "$book"
            }
        ];

        if (category) {
            pipeline.push({
                $match: {
                    "book.category": category
                }
            });
        }

        pipeline.push(
            {
                $group: {
                    _id: {
                        year: {
                            $year: "$createdAt"
                        },
                        month: {
                            $month: "$createdAt"
                        }
                    },

                    favoritesCount: {
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
        );
 const report = await UserBookAction.aggregate(
            pipeline
        );

        res.json(report);

    } catch (err) {
        console.error(err);

        res.status(500).json({
            msg: "Server error"
        });
    }
});

module.exports = router;