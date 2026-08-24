import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import { useTranslation } from "react-i18next";
import i18n from "./i18n";
import Text from "./Text";
import colorimg from "./images/colorimg.png";
import blackimg from "./images/blackimg.png";
import colorsave from "./images/savecolor.png";
import blacksave from "./images/saveblack.png";
import "./section3.css";
import blob from "./images/low.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHeartPulse,
  faBookmark,
  faStarHalfStroke,
} from "@fortawesome/free-solid-svg-icons";


export default function Lovebook() {
  const { t } = useTranslation();
    const font = i18n.language === "ar" ? 
  "elmesriRegular, sans-serif" :
   i18n.language==="zh" || i18n.language==="ja" ? "zheng":
    i18n.language==="ko"?"Dongle" :
     "playpen, sans-serif";
     const token=localStorage.getItem("token");
  const savebook = localStorage.getItem("savebook");
  const savebooks =
    savebook && Array.isArray(JSON.parse(savebook)) ? JSON.parse(savebook) : [];

  return (
    <div style={{fontFamily:"playpen",minHeight:"100vh"}}>
    {savebooks.length === 0 && (
       
        <h5 style={{ marginTop:"50vh"}} >
          <span style={{ color: "#b422a0",
                  fontSize: "50px",
                  fontFamily:font}}>{t("oops")}</span> Your save list is empty
        </h5>
      )} 

       {savebooks.length !== 0 && (
        <div
          className="bigdi"
          style={{
            paddingTop: "0%",
            fontFamily: "playpen",
            backgroundImage: `url(${blob})`,
            backgroundSize: "cover",
            display: "flex",
            flexDirection: "column",
            flexWrap: "wrap",
            justifyContent: "center",
            minHeight: "100vh",
          }}
        >
          <h3 style={{fontFamily:font}}>
            {t("savedBooks")}{" "}
            <FontAwesomeIcon
              icon={faStarHalfStroke}
              beat
              style={{ color: "ffffff", fontSize: "1.5rem" }}
            />
            :
          </h3> 

           <div style={{ display: "flex", flexWrap: "wrap" }}> 
             {savebooks.map((book) => (
              <div
              key={book.id}
                className="card"
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  fontFamily: "font",
                  marginTop: "50px",
                  marginBottom: "50px",
                }}
              >
                <div className="card__shine"></div>

                <div className="card__glow"></div>
                <div className="card__content">
                  <div className="card__image">
                    <img src={book.cover} alt={book.title} />
                  </div>

                  <div className="card__text">
                    <Text className="card__title">{book.title}</Text>
                    <Text className="card__description">{book.summary}</Text>
                  </div>

                  <div className="card__footer">
                    <div style={{ display: "flex", flexDirection: "column" }}>
                      <button className="card__button" style={{fontFamily:font}}>{t("readMore")}</button>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          marginTop: "20px",
                          gap: "5px",
                        }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
             
            ))} 
            </div>
            </div>)}
            </div>
        
  
  
  );
}
