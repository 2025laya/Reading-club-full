import "./section3.css";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import i18n from "./i18n";
import React from "react";
import { motion } from "framer-motion";
import Text from "./Text";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";

import colorimg from "./images/colorimg.png";
import blackimg from "./images/blackimg.png";
import colorsave from "./images/savecolor.png";
import blacksave from "./images/saveblack.png";

import "swiper/css";
import "swiper/css/pagination";

export default function Sec3({
  state,
  setpage,
  setSelectedBook,
  setSearchResults,
  setHasSearched
}) {
  const { t } = useTranslation();

  const font =
    i18n.language === "ar"
      ? "elmesriRegular, sans-serif"
      : i18n.language === "zh" || i18n.language === "ja"
      ? "zheng"
      : i18n.language === "ko"
      ? "Dongle"
      : "playpen, sans-serif";

  const currentDir = i18n.language === "ar" ? "rtl" : "ltr";

  const [books, setBooks] = useState([]);

  const [love, setLove] = useState({});
  const [save, setSave] = useState({});

  const [searchType, setSearchType] = useState("");
  const [searchValue, setSearchValue] = useState("");

  // const [hasSearched, setHasSearched] = useState(false);
  const [filteredBooks, setFilteredBooks] = useState([]);

  // ==========================================
  // جلب جميع الكتب
  // ==========================================

  useEffect(() => {
    async function fetchBooks() {
      try {
        const response = await fetch(
          "http://localhost:3000/api/books"
        );

        if (!response.ok) {
          throw new Error("Failed to fetch books");
        }

        const data = await response.json();

        let booksData = [];

        if (Array.isArray(data)) {
          booksData = data;
        } else if (Array.isArray(data.books)) {
          booksData = data.books;
        }

       setBooks(booksData);
setFilteredBooks(booksData);

if (setSearchResults) {
  setSearchResults(booksData);
}

if (setHasSearched) {
  setHasSearched(false);
}

      } catch (error) {
        console.error("Error fetching books:", error);
        setBooks([]);
        setFilteredBooks([]);
      }
      console.log("Books From Backend");

    }

    fetchBooks();
  }, [setSearchResults]);

  // ==========================================
  // البحث
  // ==========================================
function handleSearch(event) {

  let value = event.target.value;

  // =====================================
  // البحث حسب المؤلف
  // =====================================

  if (searchType === "author") {

    setSearchValue(value);

    const text = value.trim().toLowerCase();

    // لم يتم البحث
    if (text === "") {

      setHasSearched(false);

      setFilteredBooks(books);

      if (setSearchResults) {
        setSearchResults(books);
      }

      return;
    }

    // تم بدء البحث
    setHasSearched(true);

    const results = books.filter((book) => {

      let author = "";

      if (typeof book.author === "string") {

        author = book.author;

      } else if (
        book.author &&
        typeof book.author === "object"
      ) {

        author =
          book.author.name ||
          book.author.fullName ||
          book.author.author ||
          "";

      }

      return String(author)
        .toLowerCase()
        .includes(text);

    });

    setFilteredBooks(results);

    if (setSearchResults) {
      setSearchResults(results);
    }

    return;
  }


  // =====================================
  // البحث حسب السنة
  // =====================================

  if (searchType === "year") {

    value = value
      .replace(/[^0-9]/g, "")
      .slice(0, 4);

    setSearchValue(value);

    // لم تكتمل السنة
    if (value.length < 4) {

      setHasSearched(false);

      setFilteredBooks(books);

      if (setSearchResults) {
        setSearchResults(books);
      }

      return;
    }

    // تم البحث
    setHasSearched(true);

    const results = books.filter((book) => {

      if (!book.published) {
        return false;
      }

      const published =
        String(book.published);

      const year =
        published.substring(0, 4);

      return year === value;

    });

    setFilteredBooks(results);

    if (setSearchResults) {
      setSearchResults(results);
    }

  }
}

function changeSearchType(event) {

  const type = event.target.value;

  setSearchType(type);
  setSearchValue("");

  setHasSearched(false);

  setFilteredBooks(books);

  if (setSearchResults) {
    setSearchResults(books);
  }

}
 
  function openViewAll1() {

    if (setSearchResults) {
      setSearchResults(filteredBooks);
    }

    setpage("viewAll1");
  }

  // ==========================================
  // View All القديم
  // ==========================================

function viewAll() {

  if (setSearchResults) {
    setSearchResults(filteredBooks);
  }

  setpage("viewAll1");
}

  // ==========================================
  // فتح الكتاب
  // ==========================================

  function goToBook(book) {
    setSelectedBook(book);
    setpage("TheBook");
  }

  // ==========================================
  // Like
  // ==========================================

  async function isLove(bookId) {

    setLove((previous) => ({
      ...previous,
      [bookId]: !previous[bookId]
    }));

    try {

      await fetch(
        `http://localhost:3000/api/books/${bookId}`,
        {
          method: "PATCH"
        }
      );

    } catch (error) {
      console.log(error);
    }
  }

  // ==========================================
  // Save
  // ==========================================

  function isSave(bookId) {

    setSave((previous) => ({
      ...previous,
      [bookId]: !previous[bookId]
    }));
  }

  // ==========================================
  // LocalStorage
  // ==========================================

  useEffect(() => {

    const loveBooks = books.filter(
      (book) => love[book._id]
    );

    const saveBooks = books.filter(
      (book) => save[book._id]
    );

    localStorage.setItem(
      "lovebook",
      JSON.stringify(loveBooks)
    );

    localStorage.setItem(
      "savebook",
      JSON.stringify(saveBooks)
    );

  }, [love, save, books]);

  // ==========================================
  // أول 9 كتب فقط في Section 3
  // ==========================================

  const visibleBooks = filteredBooks.slice(0, 9);

  // ==========================================
  // هل بدأ البحث؟
  // ==========================================

  const canSearch =
    (
      searchType === "author" &&
      searchValue.trim().length >= 2
    ) ||
    (
      searchType === "year" &&
      searchValue.length === 4
    );

  return (

    <div>

      {/* =====================================
          العنوان
      ===================================== */}

      <div className="title3">

        <div
          style={{
            display: "flex",
            gap: "10px",
            alignItems: "center",
            flexWrap: "wrap"
          }}
        >

          <motion.h2
            className="The-Title-Of-Section"
            style={{
              fontFamily: font,
              color: state
                ? "#e2dfe4"
                : "#1E1B4B",
              fontSize: "27px",
              transition: "0.3s"
            }}
          >
            {t("classify")} :
          </motion.h2>

          {/* Select */}
          <motion.select
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
              duration: 0.5
            }}
            className="sel sel1"
            value={searchType}
            onChange={changeSearchType}
            style={{
              fontFamily: font
            }}
          >

            <option value="" disabled>
              {t("chooseHere")}
            </option>

            <option
              value="author"
              style={{
                fontFamily: font
              }}
            >
             {t("authorName")}
            </option>

            <option
              value="year"
              style={{
                fontFamily: font
              }}
            >
             {t("publicationYear")}
            </option>

          </motion.select>

          {/* =================================
              خانة البحث
          ================================= */}

          {searchType && (

            <input
              type="text"
              value={searchValue}
              onChange={handleSearch}

              maxLength={
                searchType === "year"
                  ? 4
                  : undefined
              }

              inputMode={
                searchType === "year"
                  ? "numeric"
                  : "text"
              }

              placeholder={
                searchType === "author"
                  ? "اكتب اسم المؤلف..."
                  : "اكتب سنة الإصدار..."
              }

              className="section3-search-input"

              style={{
                fontFamily: font
              }}
            />

          )}

        </div>

        {/* View All القديم */}

        <motion.a
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
            duration: 0.5
          }}
          href="#"
          className="view"
          onClick={(event) => {

            event.preventDefault();

            viewAll();

          }}
          style={{
            fontFamily: font,
            color: state
              ? "#e2dfe4"
              : "#1E1B4B"
          }}
        >
          {t("view")}
        </motion.a>

      </div>

      {/* =====================================
          نتائج البحث
      ===================================== */}

      {canSearch && (

        <div className="section3-results">

          <div
            className="section3-result-header"
            style={{
              fontFamily: font,
              color: state
                ? "#e2dfe4"
                : "#1E1B4B"
            }}
          >
            <span>
              عدد النتائج: {filteredBooks.length}
            </span>
          </div>
          {filteredBooks.length === 0 ? (

            <div
              className="section3-no-results"
              style={{
                fontFamily: font,
                color: state
                  ? "#e2dfe4"
                  : "#1E1B4B"
              }}
            >
              لا توجد كتب مطابقة للبحث
            </div>

          ) : (

            <div className="sec33">

              <div className="slider-container">
                <Swiper
                  dir={currentDir}
                  key={currentDir}
                  className="paddings"
                  modules={[Pagination]}
                  pagination={{
                    clickable: true
                  }}
                  spaceBetween={2}
                  breakpoints={{

                    300: {
                      slidesPerView: 2
                    },

                    768: {
                      slidesPerView: 4
                    },

                    1024: {
                      slidesPerView: 5
                    }

                  }}
                >

                  {visibleBooks.map((book) => (

                    <SwiperSlide
                      key={book._id}
                    >
                      <div
                        className={`card ${
                          state
                            ? "dark-card"
                            : ""
                        }`}
                        style={{
                          fontFamily: font,
                          marginTop: "50px",
                          marginBottom: "50px"
                        }}
                      >

                        <div className="card__image">

                          <img
                            src={book.cover}
                            alt={
                              book.title
                            }
                          />

                        </div>

                        <div className="card__text">

                          <Text className="card__title">
                            {book.title}
                          </Text>

                          <Text className="card__description">
                            {book.summary}
                          </Text>

                        </div>

                        <div className="card__footer">

                          <button
                            className="card__button"
                            onClick={() =>
                              goToBook(book)
                            }
                          >
                            {t("readMore")}
                          </button>

                          <div className="card-actions">

                            <div className="card-like">

                              <img
                                src={
                                  love[book._id]
                                    ? colorimg
                                    : blackimg
                                }
                                onClick={() =>
                                  isLove(
                                    book._id
                                  )
                                }
                                alt="love"
                              />

                              <p className="card-like-count">

                                {(Number(
                                  book.favoritesCount
                                ) || 0) +
                                  (love[
                                    book._id
                                  ]
                                    ? 1
                                    : 0)}

                              </p>

                            </div>

                            <div
                              className="card-save"
                              onClick={() =>
                                isSave(
                                  book._id
                                )
                              }
                            >

                              <img
                                src={
                                  save[
                                    book._id
                                  ]
                                    ? colorsave
                                    : blacksave
                                }
                                alt="save"
                              />

                            </div>

                          </div>

                        </div>

                      </div>

                    </SwiperSlide>

                  ))}

                </Swiper>

              </div>

            </div>

          )}

        </div>

      )}

      {!canSearch && (

        <div className="sec33">

          <div className="slider-container">

            <Swiper
              dir={currentDir}
              key={currentDir}
              className="paddings"
              modules={[Pagination]}
              pagination={{
                clickable: true
              }}
              spaceBetween={2}
              breakpoints={{

                300: {
                  slidesPerView: 2
                },

                768: {
                  slidesPerView: 4
                },

                1024: {
                  slidesPerView: 5
                }

              }}
            >

              {visibleBooks.map((book) => (

                <SwiperSlide
                  key={book._id}
                >

                  <div
                    className={`card ${
                      state
                        ? "dark-card"
                        : ""
                    }`}
                    style={{
                      fontFamily: font,
                      marginTop: "50px",
                      marginBottom: "50px"
                    }}
                  >

                    <div className="card__image">

                      <img
                        src={book.cover}
                        alt={book.title}
                      />

                    </div>

                    <div className="card__text">

                      <Text className="card__title">
                        {book.title}
                      </Text>

                      <Text className="card__description">
                        {book.summary}
                      </Text>

                    </div>

                    <div className="card__footer">

                      <button
                        className="card__button"
                        onClick={() =>
                          goToBook(book)
                        }
                      >
                        {t("readMore")}
                      </button>

                      <div className="card-actions">

                        <div className="card-like">

                          <img
                            src={
                              love[book._id]
                                ? colorimg
                                : blackimg
                            }
                            onClick={() =>
                              isLove(
                                book._id
                              )
                            }
                            alt="love"
                          />

                          <p className="card-like-count">

                            {(Number(
                              book.favoritesCount
                            ) || 0) +
                              (love[
                                book._id
                              ]
                                ? 1
                                : 0)}

                          </p>

                        </div>
                        <div
                          className="card-save"
                          onClick={() =>
                            isSave(
                              book._id
                            )
                          }
                        >

                          <img
                            src={
                              save[
                                book._id
                              ]
                                ? colorsave
                                : blacksave
                            }
                            alt="save"
                          />

                        </div>

                      </div>

                    </div>

                  </div>

                </SwiperSlide>

              ))}

            </Swiper>

          </div>

        </div>

      )}

    </div>
  );
}