import React from "react";
import Slider from "react-slick";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {  faEllipsisVertical} from "@fortawesome/free-solid-svg-icons";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import Text from "./Text.js"
export default function Comm({ comments, setComments }) {
  const { t } = useTranslation();
const editComment = (realIndex, oldText, oldRating) => {
  const newRating = prompt(t("numStars"), oldRating);

  if (newRating === null) return;

  const rating = Number(newRating);

  if (rating < 1 || rating > 5 || isNaN(rating)) {
    alert(t("enter"));
    return;
  }

  let finalText = "";

  if (rating < 5) {
    const reason = prompt(t("writeReasonHere"), "");

    if (reason === null) return;

    if (!reason.trim()) {
      alert(t("writeReasonHere"));
      return;
    }

    finalText = reason.trim();
  }

  const updated = [...comments];

  updated[realIndex] = {
    rating,
    text: rating === 5 ? "" : finalText
  };

  setComments(updated);
  localStorage.setItem("comments", JSON.stringify(updated));
};



  const deleteComment = (realIndex) => {
    const updated = [...comments];
    updated.splice(realIndex, 1);

    setComments(updated);
    localStorage.setItem("comments", JSON.stringify(updated));
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
        centerPadding: "15px",
      },
    },
    {
      breakpoint: 700,
      settings: {
        centerPadding: "10px",
      },
    },
    {
      breakpoint: 500,
      settings: {
        centerPadding: "5px",
      },
    },
  ],
};

  const data = [...(comments || [])].slice(-16).reverse();

  const chunk = (arr, size = 8) => {
    const res = [];
    for (let i = 0; i < arr.length; i += size) {
      res.push(arr.slice(i, i + size));
    }
    return res;
  };

  const pages = chunk(data, 8);

  return (
     <motion.div
      initial={{ opacity: 0, y: -30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, axis: "y", amount: 0.8 }}
      transition={{ duration: 0.3 }}
    >
    <Slider {...settings}>
      {pages.map((page, pageIndex) => (
        <div key={pageIndex}>
          <div className="grid-2x4" style={{marginTop:"30px" , marginBottom:"30px"}}>

            {page.map((c, i) => {

              const realIndex =
                comments.length - 1 - (pageIndex * 8 + i);

              return (
                <div key={i} className="comment-card">
                  <div style={{display:"flex" , gap:"30px" , justifyContent:"space-between" }}>
                  <div style={{
                    padding: "20px",
                    display:"flex",
                    flexDirection:"column",
                    justifyContent:"center",
                    alignItems:"center"
                    }}>
                      {c.text&&<Text>{c.text}</Text>}
                  <p>{"⭐️".repeat(Number(c.rating) || 0)}</p>
                  </div>
                   <div style={{ position: "relative", display: "inline-block" }}>
  <div style={{ position: "relative", display: "inline-block" }}>

  <select
    value=""
    onChange={(e) => {
      const action = e.target.value;

      if (action === "edit") {
        editComment(realIndex, c.text , c.rating);
      }

      if (action === "delete") {
        deleteComment(realIndex);
      }

      e.target.value = "";
    }}
    style={{
      position: "absolute",
      top: 0,
      left: 0,
      width: "30px",
      height: "30px",
      opacity: 0,
      cursor: "pointer",
      zIndex: 2
    }}
  >
    <option value="" hidden>
      <Text>
         {t("menu")}
      </Text>
    </option>

    <option value="edit">
      <Text>
        {t("edit1")}
      </Text>
    </option>

    <option value="delete">
      <Text>
        {t("delete")}
      </Text>
    </option>
  </select>

  <FontAwesomeIcon
    icon={faEllipsisVertical}
    style={{
      fontSize: "20px",
      color: "#1E1B4B",
      pointerEvents: "none",
    }}
  />

</div>
</div>
</div>
                </div>
              );
            })}

          </div>
        </div>
      ))}
    </Slider>
    </motion.div>
  );
}
