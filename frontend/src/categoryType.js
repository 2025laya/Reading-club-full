import React, { useEffect, useState } from "react";
import "./viewAll.css";
import { categoriesByMood } from "./category";
import { useTranslation } from "react-i18next";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBook } from "@fortawesome/free-solid-svg-icons";
import Text from "./Text";

export default function CategoryType({
  state,
  setpage,
  selectedCategory,
  setSelectedBook,
}) {
  const { t } = useTranslation();

  const [books, setBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);

  function goToHome() {
    setpage("home");
  }
  function goToBook(book) {
    setSelectedBook(book);
    setpage("TheBook");
  }
  useEffect(() => {
    async function fetchBooks() {
      try {
        const res = await fetch("http://localhost:3000/api/books");

        if (!res.ok) {
          throw new Error("Failed to fetch books");
        }

        const data = await res.json();

        console.log("All books:", data);

        setBooks(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Error fetching books:", err);
      }
    }

    fetchBooks();
  }, []);
  useEffect(() => {
    if (!selectedCategory || !Array.isArray(books)) {
      setFilteredBooks([]);
      return;
    }
    const keywords = categoriesByMood[selectedCategory] || [];

    console.log("Selected Category:", selectedCategory);
    console.log("Category Keywords:", keywords);

    if (keywords.length === 0) {
      setFilteredBooks([]);
      return;
    }

    const result = books.filter((book) => {
      const text = [
        book?.category,
        book?.title,
        book?.summary,
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase()
        .trim();
      return keywords.some((word) => {
        if (!word) return false;

        return text.includes(
          String(word).toLowerCase().trim()
        );
      });
    });

    console.log("Filtered Books:", result);

    setFilteredBooks(result);
  }, [selectedCategory, books]);

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        rowGap:"100px",
        marginTop: "3%",
      }}
    >
      <h2
        style={{
          color: state ? "#e2dfe4" : "#2E1B4B",
          transition: "0.3s",
          textAlign: "center",
        }}
      >
        <Text>{selectedCategory}</Text>
      </h2>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "100px",
          flexWrap: "wrap",
        }}
      >
        {filteredBooks.length > 0 ? (
          filteredBooks.map((book) => (
            <div
              className="card6"
              key={book._id}
              style={{
                backgroundColor: state ? "#d9d9d9" : "#27272a",
                transition: "0.3s",
              }}
            >
              <div className="image_container6">
                <img
                  style={{width:"100%",height:"100%"}}
                  src={book.cover}
                  alt={book.title}
                />
              </div>
              <div
                className="title6"
                style={{
                  color: state ? "#27272a" : "#d9d9d9",
                  transition: "0.3s",
                }}
              >
                <span>{book.title}</span>
              </div>
              <div
                className="size"
                style={{
                  color: state ? "#27272a" : "#d9d9d9",
                  transition: "0.3s",
                }}
              >
                {book.summary}
              </div>
              <div className="action">
                <button
                  className="cart-button"
                  onClick={() => goToBook(book)}
                >
                  <svg
                    className="cart-icon"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                   <FontAwesomeIcon icon={faBook} />
                  </svg>

                  <span>
                    <Text>{t("readMore")}</Text>
                  </span>
                </button>
              </div>
            </div>
          ))
        ) : (
          <p
            style={{
              color: state ? "#e2dfe4" : "#2E1B4B",
              fontSize: "20px",
            }}
          >
            No books found
          </p>
        )}
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <button
          onClick={goToHome}
          style={{
            backgroundColor: state ? "#13112d" : "#eeaeca",
            color: state ? "#e2dfe4" : "#131130",
            marginBottom:"100px"
          }}
          className="viewall-but"
        >
          <Text>{t("but2")}</Text>
        </button>
      </div>
    </div>
  );
}