import { useEffect, useState } from "react";
import React from "react";
import "./viewAll.css";
import { booksByMood } from "./booksByMood";
import { useTranslation } from "react-i18next";
import Text from "./Text";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faBook}from "@fortawesome/free-solid-svg-icons";
export default function ViewAll({state , setpage ,  selectedMood , setSelectedBook }){
  const { t } = useTranslation();
  function goToHome(){
   setpage("home");
    }
      function goToBook(book){
    setSelectedBook(book);
    setpage("TheBook");
  }
      const [books, setBooks] = useState([]);
      const [filteredBooks, setFilteredBooks] = useState([]);
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
        useEffect(() => {
          const moodWords = booksByMood[selectedMood] || [];
      
          const result = books.filter((book) => {
            if (!book.moods || !Array.isArray(book.moods)) return false;
      
            return book.moods.some((bookMood) =>
              moodWords.includes(bookMood)
            );
          });
      
          setFilteredBooks(result);
        }, [books, selectedMood]);
      
    return(
      <div style={{height:"100%" , display:"flex" , flexDirection:"column" , rowGap:"100px" , marginTop:"3%"}}>
        <h2 style={{color: state ? "#e2dfe4" : "#2E1B4B ",
              transition: "0.3s"}}>
          <Text>{t("booksMood", { mood: t(selectedMood) })}</Text>
        </h2>
        <div style={{display:"flex" , justifyContent:"center" , gap:"100px" , flexWrap:"wrap"}}>
          {filteredBooks.map((book) => (
            <div class="card6" style={{backgroundColor:state?"#d9d9d9":"#27272a",transition:"0.3s"}}>
  <div class="image_container6">
    <div key={book._id}>
          <img style={{width:"100%",height:"100%"}}src={book.cover} alt={book.title} />
        </div>
  </div>
  <div class="title6" style={{color:state?"#27272a":"#d9d9d9",transition:"0.3s"}}>
    <span>{book.title}</span>
  </div>
  <div class="size" style={{color:state?"#27272a":"#d9d9d9",transition:"0.3s"}}>
    {book.summary}
  </div>
  <div class="action">
  
    <button class="cart-button" onClick={()=>goToBook(book)}>
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
      <span><Text>{t("readMore")}</Text></span>
    </button>
  </div>
</div>

      ))}
          
        </div>
        <div style={{display:"flex" , justifyContent:"center"}}>
          <button onClick={goToHome} style={{
            backgroundColor: state ? "#13112d":"#eeaeca",
            color:state?"#e2dfe4" : "#131130"
          }}
          className="viewall-but">
           <Text>{t("but2")}</Text>
          </button>
        </div>
        
          </div>
    );
}

