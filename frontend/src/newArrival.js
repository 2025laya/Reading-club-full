import React,  { useState, useEffect } from "react";

import { useTranslation } from "react-i18next";
import i18n from "./i18n";
import "./newArrival.css";
export default function NewArr({
  setpage,
  setSelectedBook,
  state,
}) {
  const { t } = useTranslation();

  const [books, setBooks] = useState([]);
  function goToBook(book){
    setSelectedBook(book);
    setpage("TheBook");
  }
  function goToNews(){
    setpage("Arr");
  }
  const font = i18n.language === "ar" ? 
  "elmesriRegular, sans-serif" :
   i18n.language==="zh" || i18n.language==="ja" ? "zheng":
    i18n.language==="ko"?"Dongle" :
     "playpen, sans-serif";


  useEffect(() => {
    async function fetchBooks() {
      try {
        const res = await fetch("http://localhost:3000/api/books");
        const data = await res.json();

        setBooks(data);
      } catch (err) {
        console.log(err);
      }
    }

    fetchBooks();
  }, []);

const latestBooks = [...books]
  .sort((a, b) => {
    const dateA = new Date(a.published.replace(/\//g, "-"));
    const dateB = new Date(b.published.replace(/\//g, "-"));

    return dateB - dateA;
  })
  .slice(0, 5);

  return (
    <div
      style={{
        marginTop: "8%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <button
        style={{
          color: state ? "#e2dfe4" : "#131130",
          fontFamily: font,
          backgroundColor:"transparent",
          borderStyle:"none",
          fontSize:"2rem"
        }}
        onClick={goToNews}
      >
        {t("newArrival")}
      </button>

      <div className="slider-container slider1">
          {latestBooks.map((book) => (
            <div  key={book._id}>
              <div className="container">
                <div className="card_box" onClick={() => goToBook(book)}>
                  <img src={book.cover} alt={book.title} onClick={()=>goToBook(book)} style={{
                    width: "100%",
                    height: "250px",
                    borderRadius: "20px",
                    position: "relative",
                    boxShadow: "0 25px 50px rgba(0,0,0,0.55)",
                    cursor: "pointer",
                    transition: "all .3s",
                  }}/>
                  <span/>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}


         
   


