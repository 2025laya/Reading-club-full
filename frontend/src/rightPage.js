import React, { useState} from "react";
import "./rightPage.css";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserTie } from "@fortawesome/free-solid-svg-icons";

function RightPage({ state }) {
    const storedUser = localStorage.getItem("user");

    let user = null;

    try {
        user = storedUser
            ? JSON.parse(storedUser)
            : null;
    } catch (error) {
        console.log("USER PARSE ERROR:", error);
    }

    const isAdmin = user?.role === "admin";

    const [open, setOpen] = useState(false);
    const [section, setSection] = useState("dashboard");

    const [users, setUsers] = useState([]);
    const [books, setBooks] = useState([]);
    const [reports, setReports] = useState([]);
    const [dashboard, setDashboard] = useState(null);
    const [activeUsers, setActiveUsers] = useState([]);
    const [fromDate, setFromDate] = useState("");
    const [toDate, setToDate] = useState("");


    const getToken = () => {
        return (
            localStorage.getItem("token") ||
            localStorage.getItem("authToken") ||
            localStorage.getItem("userToken")
        );
    };

    const getHeaders = () => ({
        "x-auth-token": getToken(),
    });

    const showProtectedSection = (name) => {
        setSection(name);
    };

    const getDashboard = async () => {
        setSection("dashboard");

        if (!isAdmin) {
            return;
        }

        try {
            const response = await axios.get(
                "http://localhost:3000/api/admin/dashboard",
                {
                    headers: getHeaders(),
                }
            );

            setDashboard(response.data);
        } catch (error) {
            console.log(
                "Dashboard Error:",
                error.response?.data || error.message
            );
        }
    };

const getUsers = async () => {
    setSection("users");

    if (!isAdmin) {
        return;
    }

    try {
        const response = await axios.get(
            "http://localhost:3000/api/admin/users",
            {
                headers: getHeaders(),
            }
        );

        setUsers(
            Array.isArray(response.data)
                ? response.data
                : []
        );

    } catch (error) {
        console.log(
            "Users Error:",
            error.response?.status,
            error.response?.data || error.message
        );

        setUsers([]);
    }
};

const getBooks = async () => {
    setSection("books");

    if (!isAdmin) {
        return;
    }

    try {
        const response = await axios.get(
            "http://localhost:3000/api/admin/books",
            {
                headers: getHeaders(),
            }
        );

        setBooks(
            Array.isArray(response.data)
                ? response.data
                : []
        );

    } catch (error) {
        console.log(
            "Books Error:",
            error.response?.status,
            error.response?.data || error.message
        );

        setBooks([]);
    }
};

const getReports = async () => {
    setSection("reports");

    if (!isAdmin) {
        return;
    }

    try {
        const response = await axios.get(
            "http://localhost:3000/api/admin/reports",
            {
                headers: getHeaders(),
            }
        );

        setReports(
            Array.isArray(response.data)
                ? response.data
                : []
        );

    } catch (error) {
        console.log(
            "Reports Error:",
            error.response?.status,
            error.response?.data || error.message
        );

        setReports([]);
    }
};


    const getActiveUsers = async (
        from = "",
        to = ""
    ) => {
        setSection("statistics");

        if (!isAdmin) {
            return;
        }

        try {
            let url =
                "http://localhost:3000/api/admin/reports/most-active-users";

            if (from && to) {
                url += `?from=${from}&to=${to}`;
            } else if (from) {
                url += `?from=${from}`;
            } else if (to) {
                url += `?to=${to}`;
            }
            const response = await axios.get(url, {
                headers: getHeaders(),
            });

            setActiveUsers(
                Array.isArray(response.data)
                    ? response.data
                    : []
            );
        } catch (error) {
            console.log(
                "ACTIVE USERS ERROR:",
                error.response?.data || error.message
            );

            setActiveUsers([]);
        }
    };

const suspendUser = async (user) => {
    if (!isAdmin) return;

    try {
        const response = await axios.put(
            `http://localhost:3000/api/admin/users/${user._id}/suspend`,
            {},
            {
                headers: getHeaders()
            }
        );

        alert(
            response.data?.msg ||
            "User status changed successfully"
        );

        getUsers();

    } catch (error) {
        console.log(
            "SUSPEND USER ERROR:",
            error.response?.data || error.message
        );

        alert(
            error.response?.data?.msg ||
            "Cannot change user status"
        );
    }
};
const suspendBook = async (book) => {
    if (!isAdmin) return;

    try {
        const response = await axios.put(
            `http://localhost:3000/api/admin/books/${book._id}/suspend`,
            {},
            {
                headers: getHeaders(),
            }
        );

        alert(
            response.data?.msg ||
            (
                book.status === "suspended"
                    ? "Book unsuspended"
                    : "Book suspended"
            )
        );

        getBooks();

    } catch (error) {
        console.log(
            "SUSPEND BOOK ERROR:",
            error.response?.data || error.message
        );

        alert(
            error.response?.data?.msg ||
            "Cannot change book status"
        );
    }
};


    const deleteUser = async (id) => {
        if (!isAdmin) return;

        if (!window.confirm("Delete this user?")) {
            return;
        }

        try {
            await axios.delete(
                `http://localhost:3000/api/admin/users/${id}`,
                {
                    headers: getHeaders(),
                }
            );

            alert("User deleted");

            getUsers();
        } catch (error) {
            console.log(
                "DELETE USER ERROR:",
                error.response?.data || error.message
            );
        }
    };

    const deleteBook = async (id) => {
        if (!isAdmin) return;

        if (!window.confirm("Delete this book?")) {
            return;
        }

        try {
            await axios.delete(
                `http://localhost:3000/api/admin/books/${id}`,
                {
                    headers: getHeaders(),
                }
            );

            alert("Book deleted");

            getBooks();
        } catch (error) {
            console.log(
                "DELETE BOOK ERROR:",
                error.response?.data || error.message
            );
        }
    };


    const openPanel = () => {
        setOpen(true);

        if (isAdmin) {
            getDashboard();
        } else {
            setSection("dashboard");
        }
    };

    const ProtectedMessage = ({ type }) => {
        const messages = {
            users: "Only the admin is allowed to view users.",
            books: "Only the admin is allowed to view books.",
            reports: "Only the admin is allowed to view reports.",
        };

        return (
            <div className="protected-message">
                <div className="protected-icon">
                    🔒
                </div>

                <h3>Access Restricted</h3>

                <p>
                    {messages[type]}
                </p>
            </div>
        );
    };

    return (
        <>
            <button
                className="drawer-trigger"
                style={{
                    background: state ? "#CCC" : "#222",
                    color: state ? "black" : "white",
                }}
                onClick={openPanel}
            >
                <FontAwesomeIcon icon={faUserTie} />
            </button>

            {open && (
                <div
                    className="drawer-overlay"
                    onClick={() => setOpen(false)}
                />
            )}
            <div
                className={`drawer ${
                    open ? "drawer-open" : ""
                }`}
            >


                <div className="drawer-header">
                    <div>
                        <h2>
                            {isAdmin
                                ? "Admin Panel"
                                : "Reading Club"}
                        </h2>

                        <p>
                            {isAdmin
                                ? "Reading Club Management"
                                : "Your account panel"}
                        </p>
                    </div>

                    <button
                        className="drawer-close"
                        onClick={() => setOpen(false)}
                    >
                        ×
                    </button>
                </div>


                <div className="admin-menu">

                    <button
                        className={
                            section === "dashboard"
                                ? "active"
                                : ""
                        }
                        onClick={getDashboard}
                    >
                        🏠 Dashboard
                    </button>

                    <button
                        className={
                            section === "users"
                                ? "active"
                                : ""
                        }
                        onClick={() =>
                            isAdmin
                                ? getUsers()
                                : showProtectedSection("users")
                        }
                    >
                        👥 Users
                    </button>

                    <button
                        className={
                            section === "books"
                                ? "active"
                                : ""
                        }
                        onClick={() =>
                            isAdmin
                                ? getBooks()
                                : showProtectedSection("books")
                        }
                    >
                        📚 Books
                    </button>

                    <button
                        className={
                            section === "reports"
                                ? "active"
                                : ""
                        }
                        onClick={() =>
                            isAdmin
                                ? getReports()
                                : showProtectedSection("reports")
                        }
                    >
                        🚨 Reports
                    </button>

                    {isAdmin && (
                        <button
                            className={
                                section === "statistics"
                                    ? "active"
                                    : ""
                            }
                            onClick={() =>
                                getActiveUsers()
                            }
                        >
                            📊 Statistics
                        </button>
                    )}

                </div>

                <div className="drawer-body">

                    {section === "dashboard" && (
                        <div className="dashboard-content">

                            <h3>
                                {isAdmin
                                    ? "Welcome Admin 👋"
                                    : "Welcome 👋"}
                            </h3>
                            <p>
                                {isAdmin
                                    ? "Manage your Reading Club website from here."
                                    : "Some sections are available only to the administrator."}
                            </p>

                            <div className="admin-cards">

                                <div
                                    className="admin-card"
                                    onClick={() =>
                                        isAdmin
                                            ? getUsers()
                                            : showProtectedSection("users")
                                    }
                                >
                                    <span>👥</span>
                                    <h4>Users</h4>
                                    <p>
                                        {isAdmin
                                            ? "Manage users"
                                            : "Admin only"}
                                    </p>
                                </div>

                                <div
                                    className="admin-card"
                                    onClick={() =>
                                        isAdmin
                                            ? getBooks()
                                            : showProtectedSection("books")
                                    }
                                >
                                    <span>📚</span>
                                    <h4>Books</h4>
                                    <p>
                                        {isAdmin
                                            ? "Manage books"
                                            : "Admin only"}
                                    </p>
                                </div>

                                <div
                                    className="admin-card"
                                    onClick={() =>
                                        isAdmin
                                            ? getReports()
                                            : showProtectedSection("reports")
                                    }
                                >
                                    <span>🚨</span>
                                    <h4>Reports</h4>
                                    <p>
                                        {isAdmin
                                            ? "Manage reports"
                                            : "Admin only"}
                                    </p>
                                </div>

                                {isAdmin && (
                                    <div
                                        className="admin-card"
                                        onClick={() =>
                                            getActiveUsers()
                                        }
                                    >
                                        <span>📊</span>
                                        <h4>Statistics</h4>
                                        <p>
                                            View statistics
                                        </p>
                                    </div>
                                )}

                            </div>
                        </div>
                    )}


                    {section === "users" && (
                        isAdmin ? (
                            <div>
                                <h3>Users</h3>

                                {users.length === 0 ? (
                                    <p>No users found.</p>
                                    ) : (
                                    users.map((user) => (
                                        <div
                                            className="admin-item"
                                            key={user._id}
                                        >
                                            <div>
                                                <strong>
                                                    {user.name ||
                                                        user.username ||
                                                        "Unknown"}
                                                </strong>

                                                <p>
                                                    {user.email}
                                                </p>

                                               
                                                <small>
                                                    Role: {user.role}
                                                </small>
 
                                                <small>
                                                     Status:{" "}
                                                     {user.status === "suspended"  ? "🔴 Suspended"  : "🟢 Active"}
                                                </small>
                                            </div>

                                            <div className="item-buttons">

                                               <button
                                        className="suspend-btn"
                                       onClick={() => suspendUser(user)}
                                                         >
                            {user.status === "suspended" ? "Unsuspend" : "Suspend"}
                                               </button>

                                                <button
                                                    className="delete-btn"
                                                    onClick={() =>
                                                        deleteUser(
                                                            user._id
                                                        )
                                                    }
                                                >
                                                    Delete
                                                </button>

                                            </div>
                                        </div>
                                    ))
                                )}
                            </div>
                        ) : (
                            <ProtectedMessage type="users" />
                        )
                    )}

                    {section === "books" && (
                        isAdmin ? (
                            <div>
                                <h3>Books</h3>

                                {books.length === 0 ? (
                                    <p>No books found.</p>
                                ) : (
                                    books.map((book) => (
                                        <div
                                            className="admin-item"
                                            key={book._id}
                                        >
                                            <div>
                                                <strong>
                                                    {book.title}
                                                </strong>

                                                <p>
                                                    {book.author}
                                                </p>

                                                <small>
                                                    {book.category}
                                                </small>
                                            </div>
                                            <button
                                                 className="suspend-btn"
                                                 onClick={() => suspendBook(book)}
                                            >
                                                   {book.status === "suspended"  ? "Unsuspend" : "Suspend"}
                                            </button>

                                            <button
                                                  className="delete-btn"
                                                  onClick={() => deleteBook(book._id)}
                                            >
                                                  Delete
                                            </button>
                                        </div>
                                    ))
                                )}
                            </div>
                        ) : (
                            <ProtectedMessage type="books" />
                        )
                    )}

                    {/* REPORTS */}

                    {section === "reports" && (
                        isAdmin ? (
                            <div>
                                <h3>Reports 🚨</h3>

                                {reports.length === 0 ? (
                                    <p>
                                        No reports found.
                                    </p>
                                ) : (
                                    reports.map((report) => {

                                        return (
                                            <div className="report-info">

    <strong>
        📝 Complaint
    </strong>

    <p>
        {report.reason}
    </p>

    <small>
        From:{" "}
        {report.reporterId?.name ||
            report.reporterId?.username ||
            "Unknown"}
    </small>

    <br />

    <small>
        Email:{" "}
        {report.reporterId?.email ||
            "Unknown"}
    </small>

    <br />

    <small>
        Report type:{" "}
        {report.targetType === "user"
            ? "👤 User"
            : report.targetType === "book"
            ? "📚 Book"
            : "Unknown"}
    </small>

    <br />

    <small>
        Reported:{" "}
        {report.targetType === "user"
            ? (
                report.targetId?.name ||
                report.targetId?.username ||
                "Unknown user"
            )
            : report.targetType === "book"
            ? (
                report.targetId?.title ||
                "Unknown book"
            )
            : "Unknown"}
    </small>

    <br />

    <small>
        Status:{" "}
        {report.status}
    </small>

</div>
                                        );
                                    })
                                )}
                            </div>
                        ) : (
                            <ProtectedMessage type="reports" />
                        )
                    )}


                    {section === "statistics" &&
                        isAdmin && (
                            <div className="statistics-page">

                                <div className="statistics-header">

                                    <div>
                                        <h3>
                                            📊 Statistics
                                        </h3>

                                        <p>
                                            User activity
                                        </p>
                                    </div>

                                    <button
                                        className="refresh-statistics"
                                        onClick={() =>
                                            getActiveUsers(
                                                fromDate,
                                                toDate
                                            )
                                        }
                                    >
                                        ↻ Refresh
                                    </button>

                                </div>

                                <div className="statistics-filter">

                                    <div className="filter-fields">

                                        <div className="date-field">

                                            <label>
                                                From
                                            </label>

                                            <input
                                                type="date"
                                                value={fromDate}
                                                onChange={(e) =>
                                                    setFromDate(
                                                        e.target.value
                                                    )
                                                }
                                            />

                                        </div>

                                        <div className="date-field">

                                            <label>
                                                To
                                            </label>

                                            <input
                                                type="date"
                                                value={toDate}
                                                onChange={(e) =>
                                                  setToDate(
                                                        e.target.value
                                                    )
                                                }
                                            />

                                        </div>

                                        <button
                                            className="show-statistics"
                                            onClick={() =>
                                                getActiveUsers(
                                                    fromDate,
                                                    toDate
                                                )
                                            }
                                        >
                                            Show
                                        </button>

                                        <button
                                            className="reset-statistics"
                                            onClick={() => {
                                                setFromDate("");
                                                setToDate("");
                                                getActiveUsers();
                                            }}
                                        >
                                            Reset
                                        </button>

                                    </div>
                                </div>

                                <div className="statistics-summary">

                                    <div className="statistics-card">

                                        <div className="statistics-card-icon">
                                            👥
                                        </div>

                                        <div>
                                            <span>
                                                Active Users
                                            </span>

                                            <strong>
                                                {activeUsers.length}
                                            </strong>
                                        </div>

                                    </div>

                                    <div className="statistics-card">

                                        <div className="statistics-card-icon">
                                            🔥
                                        </div>

                                        <div>
                                            <span>
                                                Total Activities
                                            </span>

                                            <strong>
                                                {activeUsers.reduce(
                                                    (total, user) =>
                                                        total +
                                                        (Number(
                                                            user.activityCount
                                                        ) || 0),
                                                    0
                                                )}
                                            </strong>
                                        </div>

                                    </div>

                                    <div className="statistics-card">

                                        <div className="statistics-card-icon">
                                            🏆
                                        </div>

                                        <div>
                                            <span>
                                                Top User
                                            </span>
                                            <strong className="top-user-name">
                                                {activeUsers.length > 0
                                                    ? activeUsers[0].name ||
                                                      activeUsers[0].email ||
                                                      "Unknown"
                                                    : "-"}
                                            </strong>
                                        </div>

                                    </div>

                                </div>

                                <div className="active-users-section">

                                    <h4>
                                        👥 Most Active Users
                                    </h4>

                                    {activeUsers.length === 0 ? (
                                        <p className="no-data">
                                            No active users found.
                                        </p>
                                    ) : (
                                        activeUsers.map(
                                            (user, index) => (
                                                <div
                                                    className="admin-item"
                                                    key={
                                                        user._id ||
                                                        index
                                                    }
                                                >

                                                    <div>

                                                        <strong>
                                                            {user.name ||
                                                                "Unknown"}
                                                        </strong>

                                                        <p>
                                                            {user.email ||
                                                                ""}
                                                        </p>

                                                        <small>
                                                            Role:{" "}
                                                            {user.role ||
                                                                ""}
                                                        </small>

                                                    </div>

                                                    <div className="activity-count">

                                                        <strong>
                                                            {user.activityCount ||
                                                                0}
                                                        </strong>

                                                        <small>
                                                            Activities
                                                        </small>

                                                    </div>

                                                </div>
                                            )
                                        )
                                    )}

                                </div>

                            </div>
                        )}

                </div>
            </div>
        </>
    );
}

export default RightPage;