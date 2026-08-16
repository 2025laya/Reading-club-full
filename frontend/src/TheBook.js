import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { QRCodeCanvas } from "qrcode.react";
import "./TheBook.css";
import Text from "./Text.js";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";
// import ReportForm from "./report.js";
export default function TheBook({
  setpage,
  selectedBook,
  state,
}) {

  const { t } = useTranslation();

  const [bookComments, setBookComments] = useState([]);
  const [bookRatings , setBookRatings]=useState([]);
  const [averageRating , setAverageRating]=useState(0);

  function goToHome() {
    setpage("home");
  }

useEffect(() => {
  if (!selectedBook) {
    return;
  }

  const bookId =
    selectedBook._id || selectedBook.id;

  if (!bookId) {
    console.log("Book ID is missing");
    return;
  }
  async function getComments() {
    try {
      const res = await fetch(
        `http://localhost:3000/api/books/${bookId}/comments`
      );

      const data = await res.json();

      if (!res.ok) {
        console.log(
          "Error loading comments:",
          data
        );

        return;
      }

      console.log(
        "Comments:",
        data
      );
      if (Array.isArray(data)) {
        setBookComments(data);
      } else if (
        Array.isArray(data.comments)
      ) {
        setBookComments(data.comments);
      } else {
        setBookComments([]);
      }

    } catch (err) {
      console.log(
        "Error loading comments:",
        err
      );
    }
  }
  async function getRatings() {
    try {
      const res = await fetch(
        `http://localhost:3000/api/books/${bookId}/rating`
      );

      const data = await res.json();

      if (!res.ok) {
        console.log(
          "Error loading ratings:",
          data
        );

        return;
      }

      console.log(
        "Ratings:",
        data
      );
      if (Array.isArray(data)) {
        setBookRatings(data);

        if (data.length > 0) {
          const total = data.reduce(
            (sum, item) =>
              sum + Number(
                item.rating || item
              ),
            0
          );

          setAverageRating(
            total / data.length
          );
        }
      }

      else if (
        Array.isArray(data.ratings)
      ) {
        setBookRatings(data.ratings);

        if (data.ratings.length > 0) {
          const total =
            data.ratings.reduce(
              (sum, item) =>
                sum + Number(
                  item.rating || item
                ),
              0
            );

          setAverageRating(
            total / data.ratings.length
          );
        }
      }

      else if (
        data.averageRating !== undefined
      ) {
        setAverageRating(
          Number(data.averageRating)
        );

        setBookRatings(
          data.ratings || []
        );
      }

    } catch (err) {
      console.log(
        "Error loading ratings:",
        err
      );
    }
  }

  getComments();
  getRatings();

}, [selectedBook]);
  if (!selectedBook) {

    console.log(selectedBook);

    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
        }}
      >

        <h5
          style={{
            fontFamily: "playpen",
            margin: "0",
          }}
        >

          <span
            style={{
              color: "#b422a0",
              fontSize: "40px",
              marginRight: "170px",
              display: "inline-block",
              marginBottom: "20px",
            }}
          >
            {t("oops")}
          </span>

          <br />

          {t("noResultsFound")}

        </h5>

        <div style={{ display: "flex" }}>
          <button
            onClick={goToHome}
            style={{
              paddingLeft: "10px",
              paddingRight: "10px",
              backgroundColor: "#b422a0",
              border: "none",
              borderRadius: "25px",
              boxShadow:
                "0px 2px 7px 0px #17153a",
              marginTop: "27px",
            }}
          >
            {t("but2")}
          </button>

        </div>

      </div>
    );
  }
async function openPdf() {
  try {
    const token = localStorage.getItem("token");
    const bookId = selectedBook._id || selectedBook.id;

    const res = await fetch(
      `http://localhost:3000/api/gamification/open-book/${bookId}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": token,
        },
      }
    );

    const result = await res.json();

    console.log("Gamification result:", result);

    window.open(selectedBook.pdf, "_blank");

  } catch (error) {
    console.error("Error updating progress:", error);
    window.open(selectedBook.pdf, "_blank");
  }
}


  return (

    <div
      style={{
        padding: "2%",
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        gap: "100px",
      }}
    >


      <div
        className="book-card"
        style={{
          backgroundColor:
            state
              ? "#2a274d"
              : "#ffffff",
        }}
      >

        <div className="book-left">

          <Text
            className="book-title"
            style={{
              color:
                state
                  ? "#fff"
                  : "#27272a",
            }}
          >
            {selectedBook.title}
          </Text>


          <div className="card223">

            <img
              className="book-cover"
              src={selectedBook.cover}
              alt={selectedBook.title}
            />

          </div>


          {selectedBook.isbn && (

            <div className="book-qr">

              <QRCodeCanvas
                value={selectedBook.isbn}
                size={150}
                level="H"
              />

            </div>

          )}


          {selectedBook.pdf && (

            <button
              className="Btn book-pdf"
              onClick={openPdf}
            >

              <span className="svgContainer">
                📄
              </span>

              <div className="textContainer">

               <div className="textContainer">
  <Text style={{color:"white"}}>
    {t("openPdf")}
  </Text>
</div>

              </div>

            </button>

          )}

        </div>


        <div
          className="book-divider"
          style={{
            backgroundColor:
              state
                ? "#120E2E"
                : "#ff00bb",
          }}
        />


        <div className="book-right">


          <div
            className="error-alert"
            style={{
              backgroundColor:
                state
                  ? "#dcdeef"
                  : "#232531",
            }}
          >

            <div className="error-content">
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "start",
                  alignItems: "start",
                }}
              >

                <Text
                  style={{
                    color:
                      state
                        ? "#000"
                        : "#ffffff",
                  }}
                >
                  {t("author")} :
                </Text>

                <Text
                  style={{
                    color:
                      state
                        ? "rgb(0,0,0,0.5)"
                        : "rgb(255,255,255,0.5)",
                  }}
                >
                  {selectedBook.author}
                </Text>

              </div>

            </div>

          </div>


          <div
            className="error-alert"
            style={{
              backgroundColor:
                state
                  ? "#dcdeef"
                  : "#232531",
            }}
          >

            <div className="error-content">

              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "start",
                  alignItems: "start",
                }}
              >

                <Text
                  style={{
                    color:
                      state
                        ? "#000"
                        : "#ffffff",
                  }}
                >
                  {t("category")} :
                </Text>

                <Text
                  style={{
                    color:
                      state
                        ? "rgb(0,0,0,0.5)"
                        : "rgb(255,255,255,0.5)",
                  }}
                >
                  {selectedBook.category}
                </Text>

              </div>

            </div>

          </div>


          <div
            className="error-alert"
            style={{
              backgroundColor:
                state
                  ? "#dcdeef"
                  : "#232531",
            }}
          >

            <div className="error-content">

              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "start",
                  alignItems: "start",
                }}
              >

                <Text
                  style={{
                    color:
                      state
                        ? "#000"
                        : "#ffffff",
                  }}
                >
                  {t("description")} :
                </Text>

                <Text
                  style={{
                    color:
                      state
                        ? "rgb(0,0,0,0.5)"
                        : "rgb(255,255,255,0.5)",
                  }}
                >
                  {selectedBook.description}
                </Text>

              </div>

            </div>

          </div>


          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              gap: "30px",
            }}
          >

            {selectedBook.audio && (

              <div
                className="book-audio"
                style={{
                  backgroundColor:
                    state
                      ? "#dcdeef"
                      : "#232531",
                }}
              >

                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "5%",
                  }}
                >
                  <Text
                    style={{
                      color:
                        state
                          ? "#000"
                          : "#ffffff",
                    }}
                  >
                    {t("audio")} :
                  </Text>

                  <Text
                    style={{
                      color:
                        state
                          ? "rgb(0,0,0,0.5)"
                          : "rgb(255,255,255,0.5)",
                    }}
                  >
                    {selectedBook.title}
                  </Text>

                </div>

                <audio controls>

                  <source
                    src={selectedBook.audio}
                    type="audio/mpeg"
                  />

                  Your browser does not support audio.

                </audio>

              </div>

            )}


            <Text
              className="back-btn"
              onClick={goToHome}
              style={{
                backgroundColor:
                  state
                    ? "#120E2E"
                    : "#b422a0",
              }}
            >
              {t("but2")}
            </Text>

          </div>

        </div>

      </div>



    </div>
  );
}