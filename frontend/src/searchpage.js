import React from "react";
import './section3.css';
import { useTranslation } from "react-i18next";
import i18n from "./i18n";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faBook}from "@fortawesome/free-solid-svg-icons";
export default function Searchpage({setpage,state,books,
  setSelectedBook}) {
  const { t } = useTranslation();
  const font = i18n.language === "ar" ? 
  "elmesriRegular, sans-serif" :
   i18n.language==="zh" || i18n.language==="ja" ? "zheng":
    i18n.language==="ko"?"Dongle" :
     "playpen, sans-serif";
  function gotohome(){
    setpage("home")
  }

 function goToBook(book){
    setSelectedBook(book);
    setpage("TheBook");
  }
  return (
    <div
      className="sec33 coloring"
      style={{
        fontFamily: "playpen",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexWrap: "wrap",
        gap:"4%",
      }}
    >
      {books.length === 0 && (
        <div
          style={{
            display: "flex",
            alignItems: "center",
      
            flexDirection: "row",
            gap:"30px"
          }}
        >
          <div
            style={{
              width: "10px",
              height: "300px",
              backgroundColor:state? "#b422a0" : "#f9a2ed",
              borderRadius: "25px",
 
            }}
          ></div>
          <div style={{ display: "flex", flexDirection: "column",alignItems:"start"}}>
           
              <span
                style={{
                  color:state? "#b422a0" : "#f9a2ed",
                  fontSize: "40px",
           
                  display: "inline-block",
                  marginBottom: "20px",
                  fontFamily:font
                }}
              >
                {t("oops")}
              </span>{" "}
              {/* <br></br> */}
              <p style={{fontFamily:font , color:state?   "#eaddf9":"#1D1845" }}>
                {t("noResultsFound")}
              </p>
            
            <div style={{display:"flex"}}>
                {/* <img src={arrow} alt="arrow" style={{ width:"7%",display:"block"}} /> */}
            <button onClick={gotohome} style={{paddingLeft:"10px", paddingRight:"10px",backgroundColor:state? "#b422a0" : "#f9a2ed",border: "none",borderRadius:"25px",boxShadow:" 0px 2px 7px 0px #17153a",marginTop:"27px" , fontFamily:font , color : state ?  "#eaddf9" : "#1D1845" }}>{t("but2")}</button>
            </div>
           
          </div>
        </div>
      )}

      { books.length>0 && books.map((book, index) => (

    <div>
          <div class="card6" style={{backgroundColor:state?"#d9d9d9":"#27272a",transition:"0.3s"}}>
  <div class="image_container6">
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
      {/* <button onClick={gotohome} style={{paddingLeft:"10px", paddingRight:"10px",backgroundColor:state? "#b422a0" : "#f9a2ed",border: "none",borderRadius:"25px",boxShadow:" 0px 2px 7px 0px #17153a",marginTop:"27px" , fontFamily:font , color : state ?  "#eaddf9" : "#1D1845" }}>{t("but2")}</button>   */}
       
        </div>
      
        
      ))}
        
      
    </div>
    
  );
}
