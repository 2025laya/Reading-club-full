import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-coverflow";
import { motion } from "framer-motion";
import "swiper/css/pagination";
import { EffectCoverflow, Pagination } from "swiper/modules";
import i18n from "./i18n";
import { booksByMood } from "./booksByMood";
export default function Book({ selectedMood , setpage , setSelectedBook}) {
  const [books, setBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const currentDir = i18n.language === "ar" ? "rtl" : "ltr";

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
  function goToBook(book){
    setSelectedBook(book);
    setpage("TheBook");
  }
  return (
     <motion.div 
          initial={{ opacity: 0, y: -50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, axis: "y", amount: 0.8 }}
          transition={{ duration: 0.3 }}>
    <Swiper
      dir={currentDir}
      key={currentDir}
      effect="coverflow"
      grabCursor={true}
      centeredSlides={true}
      slidesPerView="auto"
      coverflowEffect={{
        rotate: 50,
        stretch: 0,
        depth: 100,
        modifier: 1,
        slideShadows: true,
      }}
      pagination={true}
      modules={[EffectCoverflow, Pagination]}
      className="mySwiper"
    >
      {filteredBooks.map((book) => (
        <SwiperSlide key={book._id}>
          <img src={book.cover} alt={book.title} onClick={()=>goToBook(book)}/>
        </SwiperSlide>
      ))}
    </Swiper>
    </motion.div>
  );
}