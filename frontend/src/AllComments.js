import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import Text from "./Text.js"
export default function AllComm({ comments, setComments, state }) {
  const { t } = useTranslation();
  const editComment = (index) => {
    const newRating = prompt(t("numStars"));
    if (newRating === null) return;
    const rating = Number(newRating);
    if (rating < 1 || rating > 5 || isNaN(rating)) {
      alert(t("enter"));
      return;
    }
    let text = "";
    if (rating < 5) {
      const reason = prompt(t("writeReasonHere"));
      if (reason === null) return;
      if (!reason.trim()) return;
      text = reason.trim();
    }
    const updated = [...comments];
    updated[index] = { rating, text: rating < 5 ? text : "" };
    setComments(updated);
    localStorage.setItem("comments", JSON.stringify(updated));
  };
  const deleteComment = (index) => {
    const updated = [...comments];
    updated.splice(index, 1);
    setComments(updated);
    localStorage.setItem("comments", JSON.stringify(updated));
  };
  return (
    <motion.div
      style={{ minHeight: "100vh", width: "100%" }}
      initial={{ opacity: 0, y: -30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div style={{ minHeight: "100vh", width: "100%" }}>
        <Text
          style={{
            color: state ? "#e2dfe4" : "#1E1B4B",
            marginTop: "50px",
            fontSize: "40px",
            paddingBottom: "50px",
          }}
        >
          {t("ourRating")}
        </Text>

        <div
          className="comments-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
            gap: "20px",
            padding: "20px",
            justifyItems: "center",
          }}
        >
          {(comments || []).map((c, i) => (
            <div
              key={i}
              className="comment-card"
              style={{
                width: "100%",
                maxWidth: "300px",
                height: "160px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  height: "100%",
                }}
              >
                <div
                  style={{
                    padding: "20px",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    width: "100%",
                    overflow: "hidden",
                  }}
                >
                  {c.text && (
                    <p
                      style={{
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        display: "-webkit-box",
                        WebkitLineClamp: 3,
                        WebkitBoxOrient: "vertical",
                      }}
                    >
                      {c.text}
                    </p>
                  )}
                  <p>{"⭐️".repeat(Number(c.rating) || 0)}</p>
                </div>

                <div style={{ position: "relative" }}>
<select
                    value=""
                    onChange={(e) => {
                      if (e.target.value === "edit") editComment(i);
                      if (e.target.value === "delete") deleteComment(i);
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
                    }}
                  >
                    <option value="">{t("menu")}</option>
                    <option value="edit">{t("edit1")}</option>
                    <option value="delete">{t("delete")}</option>
                  </select>

                  <FontAwesomeIcon
                    icon={faEllipsisVertical}
                    style={{
                      fontSize: "20px",
                      color: "#1E1B4B",
                    }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}