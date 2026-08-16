import { useEffect, useState } from "react";
import React from "react";
import "./viewall1.css";

import { useTranslation } from "react-i18next";
import Text from "./Text";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBook } from "@fortawesome/free-solid-svg-icons";

export default function ViewAll1({
  state,
  setpage,
  searchResults,
  setSelectedBook,
  hasSearched
}) {

  const { t } = useTranslation();

  const [books, setBooks] = useState([]);

useEffect(() => {


  if (hasSearched) {

    setBooks(
      Array.isArray(searchResults)
        ? searchResults
        : []
    );

    return;
  }

  async function fetchAllBooks() {

    try {

      const response = await fetch(
        "http://localhost:3000/api/books"
      );

      if (!response.ok) {
        throw new Error("Failed to fetch books");
      }

      const data = await response.json();

      let allBooks = [];

      if (Array.isArray(data)) {

        allBooks = data;

      } else if (Array.isArray(data.books)) {

        allBooks = data.books;

      } else if (Array.isArray(data.results)) {

        allBooks = data.results;

      }

      setBooks(allBooks);

    } catch (error) {

      console.error(
        "Error fetching books:",
        error
      );

      setBooks([]);

    }

  }

  fetchAllBooks();

}, [searchResults, hasSearched]);


  function goToHome() {

    setpage("home");

  }


  function goToBook(book) {

    setSelectedBook(book);

    setpage("TheBook");

  }


  return (

    <div className="viewall1-container">

      <h2
        className="viewall1-title"
        style={{
          color: state
            ? "#e2dfe4"
            : "#2E1B4B"
        }}
      >

        <Text>
          نتائج البحث
        </Text>

      </h2>


      <div className="viewall1-books">

        {books.length === 0 ? (

          <div
            className="viewall1-empty"
            style={{
              color: state
                ? "#e2dfe4"
                : "#2E1B4B"
            }}
          >

            <Text>
              لا توجد كتب مطابقة للبحث
            </Text>

          </div>

        ) : (

          books.map((book, index) => (

            <div
              className="card6"
              key={book._id || index}
              style={{
                backgroundColor:
                  state
                    ? "#d9d9d9"
                    : "#27272a",

                transition: "0.3s"
              }}
            >

              <div className="image_container6">

                <img
                  src={book.cover}
                  alt={book.title}
                  style={{
                    width: "100%",
                    height: "100%"
                  }}
                />

              </div>


              <div
                className="title6"
                style={{
                  color: state
                    ? "#27272a"
                    : "#d9d9d9"
                }}
              >

                <span>
                  {book.title}
                </span>

              </div>


              <div
                className="size"
                style={{
                  color: state
                    ? "#27272a"
                    : "#d9d9d9"
                }}
              >

                {book.summary}

              </div>


              <div className="action">

                <button
                  className="cart-button"
                  onClick={() =>
                    goToBook(book)
                  }
                >
                  <svg
                    className="cart-icon"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >

                    <FontAwesomeIcon
                      icon={faBook}
                    />

                  </svg>

                  <span>

                    <Text>
                      {t("readMore")}
                    </Text>

                  </span>

                </button>

              </div>

            </div>

          ))

        )}

      </div>


      <div className="viewall1-buttons">

        <button
          onClick={goToHome}
          className="viewall1-home"
        >

          <Text>
            العودة للصفحة الرئيسية
          </Text>

        </button>

      </div>

    </div>

  );

}