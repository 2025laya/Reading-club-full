import React, {useEffect,useState} from "react";
import axios from "axios";
import "./report.css";
function Report({onClose,targetType: initialType = ""}) {

    const [targetType, setTargetType] =
        useState(initialType);

    const [targetId, setTargetId] =
        useState("");

    const [reason, setReason] =
        useState("");

    const [users, setUsers] =
        useState([]);

    const [books, setBooks] =
        useState([]);

    const [loading, setLoading] =
        useState(false);

    const [loadingTargets, setLoadingTargets] =
        useState(false);

    const API =
        "http://localhost:3000";

    const getToken = () => {

        return (
            localStorage.getItem("token") ||
            localStorage.getItem("authToken") ||
            localStorage.getItem("userToken")
        );

    };

    useEffect(() => {

        const getTargets = async () => {

            try {

                setLoadingTargets(true);

                const token =
                    getToken();


                if (!token) {

                    alert(
                        "Please login first"
                    );

                    return;

                }


                const response =
                    await axios.get(
                        `${API}/api/reports/targets`,
                        {
                            headers: {
                                "x-auth-token":
                                    token
                            }
                        }
                    );


                console.log(
                    "REPORT TARGETS:",
                    response.data
                );


                setUsers(
                    response.data.users || []
                );


                setBooks(
                    response.data.books || []
                );


            } catch (error) {

                console.log(
                    "GET REPORT TARGETS ERROR:",
                    error
                );


                console.log(
                    "STATUS:",
                    error.response?.status
                );


                console.log(
                    "DATA:",
                    error.response?.data
                );


                alert(
                    error.response?.data?.msg ||
                    "Cannot load users or books"
                );


            } finally {

                setLoadingTargets(false);

            }

        };


        getTargets();

    }, []);

    const selectedUser =
        users.find(
            (user) =>
                user._id === targetId
        );

    const selectedBook =
        books.find(
            (book) =>
                book._id === targetId
        );

    const sendReport = async () => {

        if (!targetType) {

            alert(
                "Please select User or Book"
            );

            return;}
        if (!targetId) {
 alert(
                targetType === "user"
                    ? "Please select the user you want to report"
                    : "Please select the book you want to report"
            );
            return; }

        if (!reason.trim()) {

            alert(
                "Please write your complaint"
            );

            return; }
        try {

            setLoading(true);


            const token =
                getToken();


            if (!token) {

                alert(
                    "Please login first"
                );

                return;

            }


            const response =
                await axios.post(

                    `${API}/api/reports`,

                    {

                        targetType,

                        targetId,

                        reason:
                            reason.trim()

                    },

                    {

                        headers: {

                            "x-auth-token":
                                token,

                            "Content-Type":
                                "application/json"

                        }

                    }

                );


            console.log(
                "REPORT RESPONSE:",
                response.data
            );


            alert(
                "Report sent successfully"
            );

            setReason("");

            setTargetId("");

            onClose();


        } catch (error) {

            console.log(
                "REPORT ERROR:",
                error
            );


            console.log(
                "STATUS:",
                error.response?.status
            );


            console.log(
                "DATA:",
                error.response?.data
            );


            alert(

                error.response?.data?.msg ||

                "Cannot send the report"

            );


        } finally {

            setLoading(false);

        }

    };

    return (

        <div className="report-overlay">

            <div className="report-box">

                <button
                    className="report-close"
                    onClick={onClose}
                >
                    ×
                </button>

                <h2>
                    🚨 Send a Report
                </h2>


                <p>
                    Choose what you want to report,
                    then select the specific user
                    or book.
                </p>


                <label>
                    Report about
                </label>


                <select
                    value={targetType}
                    onChange={(e) => {

                        setTargetType(
                            e.target.value
                        );

                        setTargetId("");

                    }}
                >

                    <option value="">
                        Select User or Book
                    </option>


                    <option value="user">
                        👤 User
                    </option>


                    <option value="book">
                        📚 Book
                    </option>

                </select>

                {targetType === "user" && (

                    <>

                        <label>
                            Select user
                        </label>
<select
                            value={targetId}
                            onChange={(e) =>
                                setTargetId(
                                    e.target.value
                                )
                            }
                            disabled={
                                loadingTargets
                            }
                        >

                            <option value="">

                                {loadingTargets
                                    ? "Loading users..."
                                    : "Select the user"}

                            </option>


                            {users.map(
                                (user) => (

                                    <option
                                        key={
                                            user._id
                                        }
                                        value={
                                            user._id
                                        }
                                    >

                                        {user.name ||
                                            user.username ||
                                            user.email}

                                        {user.email
                                            ?  `- ${user.email}`
                                            : ""}

                                    </option>

                                )
                            )}

                        </select>

                    </>

                )}

                {targetType === "book" && (

                    <>

                        <label>
                            Select book
                        </label>


                        <select
                            value={targetId}
                            onChange={(e) =>
                                setTargetId(
                                    e.target.value
                                )
                            }
                            disabled={
                                loadingTargets
                            }
                        >

                            <option value="">

                                {loadingTargets
                                    ? "Loading books..."
                                    : "Select the book"}

                            </option>


                            {books.map(
                                (book) => (

                                    <option
                                        key={
                                            book._id
                                        }
                                        value={
                                            book._id
                                        }
                                    >

                                        📚 {book.title}

                                    </option>

                                )
                            )}

                        </select>

                    </>

                )}

                {targetId && (

                    <div className="report-target">

                        <span>
                            Reported:
                        </span>


                        <strong>

                            {targetType === "user"
                                ? "👤 User"
                                : "📚 Book"}

                        </strong>


                        <small>

                            {targetType === "user"

                                ? (
 selectedUser
                                        ? `${selectedUser.name || ""} ${selectedUser.lastName || ""}.trim()` ||
                                          selectedUser.username ||
                                          selectedUser.email
                                        : "User not found"

                                )

                                : (

                                    selectedBook
                                        ? selectedBook.title
                                        : "Book not found"

                                )}

                        </small>

                    </div>

                )}

                <label>
                    Your complaint
                </label>


                <textarea
                    value={reason}
                    onChange={(e) =>
                        setReason(
                            e.target.value
                        )
                    }
                    placeholder="Write your complaint here..."
                />

                <button
                    className="send-report"
                    onClick={sendReport}
                    disabled={
                        loading ||
                        loadingTargets
                    }
                >

                    {loading
                        ? "Sending..."
                        : "Send Report"}

                </button>


            </div>

        </div>

    );

}


export default Report;