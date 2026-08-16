import React from "react";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faBook}from "@fortawesome/free-solid-svg-icons";
import { useTranslation } from "react-i18next";
import i18n from "./i18n";
export default function Arr({state,setpage,setstate,setSelectedBook}){
    const { t } = useTranslation();
    const font = i18n.language === "ar" ? 
  "elmesriRegular, sans-serif" :
   i18n.language==="zh" || i18n.language==="ja" ? "zheng":
    i18n.language==="ko"?"Dongle" :
     "playpen, sans-serif";
    const [books, setBooks] = useState([]);
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
    function goToHome(){
        setpage("home");
    }

     function goToBook(book){
    setSelectedBook(book);
    setpage("TheBook");
  }
    return(
        <div style={{height:"100%",fontFamily:font,fontSize:"2.5rem" , marginTop:"4%" , display:"flex" , flexDirection:"column" , rowGap:"100px",justifyContent:"center",
            color:state?"#e2dfe4" : "#131130" , transition:"0.3s"}} >
          <div>
             {t("ourNews")}💕📚
          </div>
          <div style={{display:"flex" ,alignItems:"center", flexWrap:"wrap" , justifyContent:"center" , columnGap:"5%" , rowGap:"50px"}}>
             {[...books]
  .sort((a, b) => {
    const dateA = new Date(a.published.replace(/\//g, "-"));
    const dateB = new Date(b.published.replace(/\//g, "-"));

    return dateB - dateA;
  })
  .slice(0,30)
  .map((book) => (
             <div class="card6" style={{backgroundColor:state?"#d9d9d9":"#27272a",transition:"0.3s",height:"100%"}}>
  <div class="image_container6" >
    <div key={book._id}>
          <img style={{width:"100%",height:"100%"}} src={book.cover} alt={book.title} />
        </div>
  </div>
  <div class="title6" style={{color:state?"#27272a":"#d9d9d9",transition:"0.3s"}}>
    <span>{book.title}</span>
  </div>
  <div class="size" style={{color:state?"#27272a":"#d9d9d9",transition:"0.3s"}}>
    {book.summary}
  </div>
  <div class="action">
    <button class="cart-button">
      <svg
        class="cart-icon"
        stroke="currentColor"
        stroke-width="1.5"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
      
        <FontAwesomeIcon icon={faBook} />
      </svg>
      <span  onClick={()=>goToBook(book)} style={{fontFamily:font}}>{t("readMore")}</span>
    </button>
  </div>
</div>

      ))}
          </div>
          <div style={{display:"flex",justifyContent:"center"}}>
          <button onClick={goToHome}
          style={{  backgroundColor: state ? "#13112d":"#eeaeca",
            color:state?"#e2dfe4" : "#131130",
            fontFamily: font,transition:"0.3s",marginBottom:"70px"}} className="viewall-but">
             {t("but2")}
          </button>
          </div>
        </div>
    );
}
