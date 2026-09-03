import React, {useEffect,useState} from "react";
import Slider from "react-slick";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEllipsisVertical} from "@fortawesome/free-solid-svg-icons";
import {useTranslation} from "react-i18next";
import {motion} from "framer-motion";
import user3333 from "./images/user.png";
import user1 from "./images/user1.png";
import user2 from "./images/user2.png";
import user3 from "./images/user3.png";
import user4 from "./images/user4.png";
import user5 from "./images/user5.png";
import user6 from "./images/user6.png";
import user7 from "./images/user7.png";
import user8 from "./images/user8.png";
import user9 from "./images/user9.png";
import user10 from "./images/user10.png";
import user11 from "./images/user11.png";
import user12 from "./images/user12.png";
import user13 from "./images/user13.png";
import user14 from "./images/user14.png";
import user15 from "./images/user15.png";
import user16 from "./images/user16.png";
import user17 from "./images/user17.png";
import user18 from "./images/user18.png";
import user19 from "./images/user19.png";
import user20 from "./images/user20.png";
import user21 from "./images/user21.png";
import user22 from "./images/user22.png";
import user23 from "./images/user23.png";
import user24 from "./images/user24.png";
import user25 from "./images/user25.png";
import user26 from "./images/user26.png";
import user27 from "./images/user27.png";
import user28 from "./images/user28.png";
import user29 from "./images/user29.png";
import user30 from "./images/user30.png";
import user31 from "./images/user31.png";
import Text from "./Text.js";
const avatars = [
    user1,user2,user3,user4,
    user5,user6,user7,user8,
    user9,user10,user11,user12,
    user13,user14,user15,user16,
    user17,user18,user19,user20,
    user21,user22,user23,user24,
    user25,user26,user27,user28,
    user29,user30,user31
];


export default function Comm({
    comments,
    setComments
}) {

    const { t } =
        useTranslation();


    const [
        currentUser,
        setCurrentUser
    ] = useState(null);
    useEffect(() => {

        async function getCurrentUser() {

            try {

                const token =
                    localStorage.getItem("token");

                if (!token) {
                    return;
                }


                const response =
                    await fetch(
                        "http://localhost:3000/api/me",
                        {
                            headers: {
                                "x-auth-token":
                                    token
                            }
                        }
                    );


                const data =
                    await response.json();


                if (response.ok) {

                    setCurrentUser(data);

                    localStorage.setItem(
                        "user",
                        JSON.stringify(data)
                    );
                }

            } catch (err) {

                console.error(
                    "CURRENT USER ERROR:",
                    err
                );
            }
        }


        getCurrentUser();

    }, []);
    useEffect(() => {

        async function getComments() {

            try {

                const response =
                    await fetch(
                        "http://localhost:3000/api/site-comments"
                    );


                const data =
                    await response.json();
                    console.log(
                    "COMM COMMENTS:",
                    data
                );


                if (response.ok) {

                    setComments(
                        Array.isArray(data)
                            ? data
                            : []
                    );
                }

            } catch (err) {

                console.error(
                    "GET COMMENTS ERROR:",
                    err
                );
            }
        }


        getComments();

    }, [setComments]);
    const editComment = async (
        commentId,
        oldText,
        oldRating
    ) => {

        const newRating =
            prompt(
                t("numStars"),
                oldRating
            );


        if (newRating === null) {
            return;
        }


        const rating =
            Number(newRating);


        if (
            Number.isNaN(rating) ||
            rating < 1 ||
            rating > 5
        ) {

            alert(
                t("enter")
            );

            return;
        }


        let finalText = "";


        if (rating < 5) {

            const reason =
                prompt(
                    t("writeReasonHere"),
                    oldText || ""
                );


            if (reason === null) {
                return;
            }


            if (!reason.trim()) {

                alert(
                    t("writeReasonHere")
                );

                return;
            }


            finalText =
                reason.trim();
        }


        try {

            const token =
                localStorage.getItem("token");


            if (!token) {
                return;
            }


            const response =
                await fetch(
                    `http://localhost:3000/api/site-comments/${commentId}`,
                    {
                        method: "PUT",

                        headers: {
                            "Content-Type":
                                "application/json",

                            "x-auth-token":
                                token
                        },

                        body:
                            JSON.stringify({
                                text:
                                    finalText,

                                rating:
                                    rating
                            })
                    }
                );


            const data =
                await response.json();


            if (!response.ok) {

                alert(
                    data.msg ||
                    "Edit error"
                );

                return;
            }


            setComments(
                prev =>
                    prev.map(
                        comment =>
                            String(
                                comment._id
                            ) ===
                            String(
                                commentId
                            )
                                ? data.comment
                                : comment
                    )
            );


        } catch (err) {

            console.error(
                "EDIT ERROR:",
                err
            );
        }
    };
    const deleteComment = async (
        commentId
    ) => {

        const confirmed =
            window.confirm(
                "Are you sure you want to delete this comment?"
            );


        if (!confirmed) {
            return;
        }


        try {

            const token =
                localStorage.getItem("token");


            if (!token) {
                return;
            }
            const response =
                await fetch(
                    `http://localhost:3000/api/site-comments/${commentId}`,
                    {
                        method: "DELETE",

                        headers: {
                            "x-auth-token":
                                token
                        }
                    }
                );


            const data =
                await response.json();


            if (!response.ok) {

                alert(
                    data.msg ||
                    "Delete error"
                );

                return;
            }


            setComments(
                prev =>
                    prev.filter(
                        comment =>
                            String(
                                comment._id
                            ) !==
                            String(
                                commentId
                            )
                    )
            );


        } catch (err) {

            console.error(
                "DELETE ERROR:",
                err
            );
        }
    };
    const settings = {

        infinite: true,

        centerMode: true,

        slidesToShow: 1,

        speed: 500,

        centerPadding: "20px",

        responsive: [

            {
                breakpoint: 1000,

                settings: {
                    centerPadding:
                        "15px"
                }
            },

            {
                breakpoint: 700,

                settings: {
                    centerPadding:
                        "10px"
                }
            },

            {
                breakpoint: 500,

                settings: {
                    centerPadding:
                        "5px"
                }
            }

        ]
    };
    const data =
        [
            ...(comments || [])
        ]
            .slice(0, 16);
    const chunk = (
        arr,
        size = 8
    ) => {

        const result = [];


        for (
            let i = 0;
            i < arr.length;
            i += size
        ) {

            result.push(
                arr.slice(
                    i,
                    i + size
                )
            );
        }


        return result;
    };


    const pages =
        chunk(
            data,
            8
        );


    return (

        <motion.div

            initial={{
                opacity: 0,
                y: -30
            }}

            whileInView={{
                opacity: 1,
                y: 0
            }}

            viewport={{
                once: true,
                axis: "y",
                amount: 0.8
            }}

            transition={{
                duration: 0.3
            }}
        >

            <Slider {...settings}>

                {pages.map(
                    (
                        page,
                        pageIndex
                    ) => (

                        <div
                            key={
                                `page-${pageIndex}`
                            }
                        >

                            <div
                                className="grid-2x4"

                                style={{
                                    marginTop:
                                        "30px",

                                    marginBottom:
                                        "30px"
                                }}
                            >
                            {page.map(
                                    (
                                        c,
                                        i
                                    ) => {

                                        const owner =
                                            c.userId &&
                                            typeof c.userId ===
                                                "object"
                                                ? c.userId
                                                : null;


                                        const firstName =
                                            owner?.name || "";


                                        const lastName =
                                            owner?.lastName || "";


                                        const email =
                                            owner?.email || "";


                                        const senderName =
                                            `${firstName} ${lastName}`.trim() ||
                                            "User";


                                        const avatarIndex =
                                            owner?.avatar !== null &&
                                            owner?.avatar !== undefined &&
                                            owner?.avatar !== ""
                                                ? Number(
                                                    owner.avatar
                                                )
                                                : null;


                                        const senderAvatar =
                                            avatarIndex !== null &&
                                            avatars[
                                                avatarIndex
                                            ]
                                                ? avatars[
                                                    avatarIndex
                                                ]
                                                : user3333;


                                        const isOwner =
                                            currentUser &&
                                            owner &&
                                            String(
                                                currentUser._id
                                            ) ===
                                            String(
                                                owner._id
                                            );
const isAdmin =
    currentUser?.role === "admin";

                                        return (

                                            <div
                                                key={`${c._id}-${i}`}

                                                className="comment-card"
                                            >

                                                <div
                                                    style={{
                                                        display:
                                                            "flex",

                                                        gap:
                                                            "30px",

                                                        justifyContent:
                                                            "start"
                                                    }}
                                                >

                                                    <div
                                                        style={{
                                                            padding:
                                                                "20px",

                                                            display:
                                                                "flex",
                                                          flexDirection:
                                                                "column",

                                                            justifyContent:
                                                                "center",

                                                            alignItems:
                                                                "center",

                                                            width:
                                                                "100%"
                                                        }}
                                                    >

                                                        <div
                                                            style={{
                                                                display:
                                                                    "flex",

                                                                gap:
                                                                    "15px",

                                                                alignItems:
                                                                    "center"
                                                            }}
                                                        >

                                                            <img
                                                                src={
                                                                    senderAvatar
                                                                }

                                                                alt="profile"

                                                                width="60"

                                                                height="60"

                                                                style={{
                                                                    borderRadius:
                                                                        "50%",

                                                                    objectFit:
                                                                        "cover"
                                                                }}
                                                            />


                                                            <div>

                                                                <Text>
                                                                    {
                                                                        senderName
                                                                    }
                                                                </Text>


                                                                <div
                                                                    style={{
                                                                        fontSize:
                                                                            "13px",

                                                                        color:
                                                                            "#777",

                                                                        marginTop:
                                                                            "5px"
                                                                    }}
                                                                >
                                                                    {
                                                                        email
                                                                    }
                                                                </div>

                                                            </div>

                                                        </div>
                                                     {c.text && (

                                                            <Text>
                                                                {
                                                                    c.text
                                                                }
                                                            </Text>

                                                        )}


                                                        <p>
                                                            {
                                                                "⭐️".repeat(
                                                                    Number(
                                                                        c.rating
                                                                    ) || 0
                                                                )
                                                            }
                                                        </p>

                                                    </div>


                                                    {(isOwner||isAdmin) && (

                                                        <div
                                                            style={{
                                                                position:
                                                                    "relative",

                                                                display:
                                                                    "inline-block"
                                                            }}
                                                        >

                                                            <select

                                                                defaultValue=""

                                                                onChange={(
                                                                    e
                                                                ) => {

                                                                    const action =
                                                                        e.target.value;


                                                                    if (
                                                                        action ===
                                                                        "edit"
                                                                    ) {

                                                                        editComment(
                                                                            c._id,
                                                                            c.text,
                                                                            c.rating
                                                                        );
                                                                    }


                                                                    if (
                                                                        action ===
                                                                        "delete"
                                                                    ) {

                                                                        deleteComment(
                                                                            c._id
                                                                        );
                                                                    }


                                                                    e.target.value =
                                                                        "";
                                                                }}
                                                style={{
                                                                    position:
                                                                        "absolute",

                                                                    top: 0,

                                                                    left: 0,

                                                                    width:
                                                                        "30px",

                                                                    height:
                                                                        "30px",

                                                                    opacity: 0,

                                                                    cursor:
                                                                        "pointer",

                                                                    zIndex: 2
                                                                }}
                                                            >

                                                                <option
                                                                    value=""
                                                                    hidden
                                                                >
                                                                    {
                                                                        t("menu")
                                                                    }
                                                                </option>


                                                                <option value="edit">
                                                                    {
                                                                        t("edit1")
                                                                    }
                                                                </option>


                                                                <option value="delete">
                                                                    {
                                                                        t("delete")
                                                                    }
                                                                </option>

                                                            </select>


                                                            <FontAwesomeIcon
                                                                icon={
                                                                    faEllipsisVertical
                                                                }

                                                                style={{
                                                                    fontSize:
                                                                        "20px",

                                                                    color:
                                                                        "#1E1B4B",

                                                                    pointerEvents:
                                                                        "none"
                                                                }}
                                                            />

                                                        </div>

                                                    )}

                                                </div>

                                            </div>

                                        );
                                    }
                                )}

                            </div>

                        </div>
                    )
                )}

            </Slider>

        </motion.div>
    );
}                         