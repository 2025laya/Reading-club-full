import "./section4.css";

import { useTranslation } from "react-i18next";
import i18n from "./i18n";

import { useState } from "react";

import Text from "./Text";


export default function Sec4({
    state,
    setpage,
    addComment,
    bookId
}) {

    const { t } =
        useTranslation();


    const font =
        i18n.language === "ar"
            ? "elmesriRegular, sans-serif"
            : i18n.language === "zh" ||
              i18n.language === "ja"
                ? "zheng"
                : i18n.language === "ko"
                    ? "Dongle"
                    : "playpen, sans-serif";


    const [text, setText] =
        useState("");


    const [rating, setRating] =
        useState(0);
    const isDisabled =
        rating === 0 ||
        (
            rating < 5 &&
            text.trim() === ""
        );
    async function handleSubmit() {

        try {

            const token =
                localStorage.getItem("token");


            if (!token) {

                alert(
                    "Please login first"
                );

                return;
            }


            if (rating === 0) {
                return;
            }


            if (
                rating < 5 &&
                !text.trim()
            ) {

                alert(
                    t("writeReasonHere")
                );

                return;
            }


            console.log(
                "SENDING COMMENT..."
            );


            const commentResponse =
                await fetch(
                    "http://localhost:3000/api/site-comments",
                    {
                        method: "POST",

                        headers: {
                            "Content-Type":
                                "application/json",

                            "x-auth-token":
                                token
                        },

                        body:
                            JSON.stringify({
                                text:
                                    rating < 5
                                        ? text.trim()
                                        : "",

                                rating:
                                    rating
                            })
                    }
                );


            console.log(
                "COMMENT STATUS:",
                commentResponse.status
            );


            const commentResult =
                await commentResponse.json();


            console.log(
                "COMMENT RESPONSE:",
                commentResult
            );


            if (!commentResponse.ok) {

                console.log(
                    "COMMENT ERROR:",
                    commentResult
                );

                alert(
                    commentResult.msg ||
                    "Comment error"
                );

                return;
            }
            if (
                commentResult.comment &&
                addComment
            ) {

                addComment(
                    commentResult.comment
                );
            }


            setText("");

            setRating(0);


            setpage("home");


        } catch (err) {

            console.error(
                "SUBMIT ERROR:",
                err
            );
        }
    }

    function go_to_home() {

        setpage("home");
    }


    return (
        <div className="headComment">

            <h1
                style={{
                    fontFamily: font,

                    color:
                        state
                            ? "#e2dfe4"
                            : "#1E1B4B"
                }}
            >

                {t("title1")}

                <br />

                <span
                    style={{
                        color: "#6366F1",

                        fontFamily: font
                    }}
                >
                    {t("title2")}
                </span>

            </h1>


            <h4
                style={{
                    fontFamily: font,

                    color:
                        state
                            ? "#e2dfe4"
                            : "#1E1B4B"
                }}
            >
                {t("com4")} :
            </h4>

            <div>

                {[1, 2, 3, 4, 5].map(
                    (star) => (

                        <span
                            key={star}

                            onClick={() => {

                                setRating(star);

                                if (star === 5) {

                                    setText("");
                                }

                            }}

                            style={{
                                fontSize: "30px",

                                cursor: "pointer",

                                color:
                                    star <= rating
                                        ? "gold"
                                        : "gray"
                            }}
                        >
                            ★
                        </span>

                    )
                )}

            </div>

            {rating > 0 &&
                rating < 5 && (

                    <div>

                        <h3
                            style={{
                                fontFamily: font,

                                color:
                                    state
                                        ? "#e2dfe4"
                                        : "#1E1B4B"
                            }}
                        >
                            {t("com5")}
                        </h3>


                        <textarea

                            value={text}

                            onChange={(e) =>
                                setText(
                                    e.target.value
                                )
                            }

                            maxLength={50}

                            style={{
                                borderRadius:
                                    "15px",

                                paddingLeft:
                                    "10px",

                                borderColor:
                                    "#6366F1",

                                borderWidth:
                                    "5px",

                                fontFamily:
                                    font
                            }}

                            rows="4"

                            cols="70"

                            placeholder={
                                t(
                                    "writeReasonHere"
                                )
                            }

                        />

                    </div>

                )}

            <div
                style={{
                    display: "flex",

                    gap: "100px"
                }}
            >

                <button

                    disabled={isDisabled}

                    onClick={
                        handleSubmit
                    }

                    style={{
                        backgroundColor:
                            isDisabled
                                ? "gray"
                                : "#eeaeca",

                        cursor:
                            isDisabled
                                ? "not-allowed"
                                : "pointer",

                        color:
                            isDisabled
                                ? "white"
                                : "black",

                        fontFamily:
                            font
                    }}

                    className="clickButt"
                >
                    {t("but1")}
                </button>


                <button

                    className="clickButt"

                    onClick={
                        go_to_home
                    }

                    style={{
                        fontFamily:
                            font
                    }}
                >
                    {t("but2")}
                </button>

            </div>

        </div>
    );
}