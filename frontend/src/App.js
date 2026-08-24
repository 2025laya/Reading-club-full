import React, { useEffect, useState } from "react";
import "./App.css";
import Login from "./Login";
import Nav from "./Nav";
import Textheader from "./TextHeader";
import ImgHeader from "./ImgHeader";
import About from "./About";
import Chat from "./Chat";
import Sec from "./Section1";
import "./Section1.css";
import Sec2 from "./Section2";
import "./Section2.css";
import Book from "./Books";
import "./Books.css";
import Types from "./Section22";
import Sec3 from "./section3.js";
import Hero from "./BookStore2.js";
import "./BookStore2.css";
import "./mainHeader.css";
import Comments from "./commentsSection";
import "./commentsSection.css";
import "./BodyOfComm.css";
import Comm from "./BodyOfComments.js";
import Sec4 from "./section4.js";
import "./section4.css";
import "./Arabfont.css";
import Goal from "./goal.js";
import "./About.css";
import Leaderboard from "./Leaderboard.js";
import ActiveMember from "./ActiveMember.js";
import Mypoint from "./Mypoint.js";
import Badge1 from "./badge1.js";
import Badge2 from "./badge2.js";
import { useTranslation } from "react-i18next";
import i18n from "./i18n";
import AllComm from "./AllComments.js"
import Profile from "./profile.js";
import Logout from "./DeleteAcount.js";
import Searchpage from "./searchpage.js";
import Footer from "./footer.js";
import ViewAll from "./viewAll.js";
import NewArr from "./newArrival.js";
import Lovebook from "./lovebook.js";
import TheBook from "./TheBook.js";
import Arr from "./newArrBut";
import CategoryType from "./categoryType.js";
import Sec5 from "./notesAboutUs.js";
import ViewAll1 from "./viewall1.js";
import EditAccount from "./editAccount";
function App() {
  const { t } = useTranslation();
  const font = i18n.language === "ar" ? 
  "elmesriRegular, sans-serif" :
   i18n.language==="zh" || i18n.language==="ja" ? "zheng":
    i18n.language==="ko"?"Dongle" :
     "playpen, sans-serif";
  const [page, setpage] = useState("home");
  const [state, setstate] = useState(false);
  const [selectedMood , setSelectedMood]=useState("joyful"); 
  const [selectedBook , setSelectedBook]=useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [comments, setComments] = useState([]);
  const [profileReturnPage , setProfileReturnPage]=useState("signin");
  const [isEditing, setIsEditing] = useState(false);
  const [user, setUser] = useState(
  JSON.parse(localStorage.getItem("user") || "null"));
  useEffect(() => {
    const savedComments = localStorage.getItem("comments");
    if (savedComments) {
      setComments(JSON.parse(savedComments));
    }
  }, []);
  function addComment(newComment) {
    const updatedComments = [...comments, newComment];
    
    setComments(updatedComments);

    localStorage.setItem("comments", JSON.stringify(updatedComments));
  }
  function addBookComment(newComment) {
  const updatedComments = [...bookComments, newComment];

  setBookComments(updatedComments);

  localStorage.setItem(
    "bookComments",
    JSON.stringify(updatedComments)
  );
}
  const [token, settoken] = useState(localStorage.getItem("token"));
  useEffect(() => {
    const currentToken = localStorage.getItem("token");
    settoken(currentToken);
  }, [page]);
  const [hasSearched, setHasSearched] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [books, setbook] = useState([]);
  const [bookComments, setBookComments] = useState(
  JSON.parse(localStorage.getItem("bookComments")) || []
);
  return (
    <div
      className="App coloring"
      style={
        state === true
          ? { backgroundColor: "#1D1845" }
          : { backgroundColor: "#e9d5ff97" }
      
      }
    >
      <div>
        <div>
          {page === "home" && (
            <div>
              <Nav setpage={setpage} setstate={setstate} state={state} />
              <div
                className="Header"
                style={
                  state === true
                    ? { backgroundColor: "#120E2E" }
                    : { backgroundColor: "#dfc4fd" }
                }
              >
                <Textheader
                  setstate={setstate}
                  state={state}
                  setpage={setpage}
                  setbook={setbook}
                />
                <ImgHeader />
              </div>

              <Hero setpage={setpage} state={state} />
              <NewArr state={state} setpage={setpage} setSelectedBook={setSelectedBook}/>
              <Sec state={state} setpage={setpage} setSelectedMood={setSelectedMood} selectedMood={selectedMood}/>
              <Book setSelectedMood={setSelectedMood} selectedMood={selectedMood} setpage={setpage} state={state} setSelectedBook={setSelectedBook}/>
              <Sec2 state={state} setpage={setpage}/>
              <Types setpage={setpage} setSelectedCategory={setSelectedCategory}/>
              <Sec3 state={state} setpage={setpage} setSelectedBook={setSelectedBook} setSearchResults={setSearchResults} setHasSearched={setHasSearched}/>
              <Comments state={state} setpage={setpage} />
              <Comm comments={comments} setComments={setComments}/>
              <Footer state={state} setstate={setstate} setpage={setpage}/>
            </div>
          )}
          {page === "signin" && (
            <div>
              {" "}
              <Nav setpage={setpage} state={state} setstate={setstate} />{" "}
              <Login
                style={{ fontFamily: font }}
                state={state}
                mode="login"
                setpage={setpage}
                field1={t("email")}
                field2={t("pass")}
                namebutton={t("signIn")}
                isSignup={false}
                setProfileReturnPage={setProfileReturnPage}
              >
                <h2 style={{ marginBottom: "20px", fontFamily: font }}>
                  {t("signI1")} <br></br> {t("signI2")}{" "}
                </h2>
              </Login>{" "}
            </div>
          )}
         
          {page === "signup" && (
            <div>
              {" "}
              <Nav setpage={setpage} state={state} setstate={setstate} />{" "}
              <Login
                style={{ fontFamily: font }}
                state={state}
                setpage={setpage}
                mode="signup"
                field1={t("email")}
                field2={t("pass")}
                namebutton={t("signUp")}
                field3={t("first name")}
                field4={t("last name")}
                isSignup={true}
                setProfileReturnPage={setProfileReturnPage}
                isEditing={isEditing}
                setIsEditing={setIsEditing}
              >
                {" "}
                <h2 style={{ marginBottom: "20px", fontFamily: font }}>
                  {t("signU1")} <br></br> {t("signU2")}
                </h2>
              </Login>
            </div>
          )}
           {page === "Logout" && (
            <div>
              {" "}
              <Nav setpage={setpage} state={state} setstate={setstate} />{" "}
              
              <Logout 
                style={{ fontFamily: font }}
                state={state}
                mode="login"
                setpage={setpage}
                field1={t("email")}
                field2={t("pass")}
                namebutton={t("signIn")}
                isSignup={false}
                setProfileReturnPage={setProfileReturnPage}
              >
                <h2 style={{ marginBottom: "20px", fontFamily: font }}>
                  {t("logout1")} <br></br> {t("logout2")}{" "}
                </h2>
              </Logout>{" "}
            </div>
          )}
          {page === "editAccount" && (
  <EditAccount
    setpage={setpage}
    setUser={setUser}
    state={state}
    setProfileReturnPage={setProfileReturnPage}
  />
)}
         {page === "viewAll1" && (
  <ViewAll1
    state={state}
    setpage={setpage}
    searchResults={searchResults}
    setSelectedBook={setSelectedBook}
    hasSearched={hasSearched}
  />
)}
          {page==="TheBook" && (
            <div>
              <Nav state={state} setpage={setpage} setstate={setstate}/>
              <TheBook state={state} setpage={setpage} setstate={setstate} selectedBook={selectedBook} setBookComments={setBookComments} bookComments={bookComments}/>
            </div>
          )}
          {page==="notesAboutUs" && (
           <div>
            <Nav state={state} setpage={setpage} setstate={setstate}/>
            <Sec5
             state={state}
             setpage={setpage} 
             setstate={setstate}
             addBookComment={addBookComment} 
             setBookComments={setBookComments} 
             bookId={selectedBook?.addedBy}
             selectedBook={selectedBook} />
           </div>
          )}
           {page === "profile" && (
                      <div>
                        <Nav 
                         setpage={setpage}
                         state={state}
                         setstate={setstate} />
                        <Profile
                         setpage={setpage}
                         state={state} 
                         returnPage={profileReturnPage}
                         />
                      </div>
                    )}
          
          {page === "chat" && <Chat setpage={setpage} state={state} />}
          {page === "about" && (
            <div>
              {" "}
              <About setpage={setpage} state={state} />{" "}
            </div>
          )}
          {page === "section4" && (
            <Sec4
              setpage={setpage}
              addComment={addComment}
              bookId={1}
              state={state}
            />
          )}
          { page==="Arr" &&
          <div>
            <Nav state={state} setpage={setpage} setstate={setstate}/>
            <Arr state={state} setpage={setpage} setstate={setstate} setSelectedBook={setSelectedBook}/>
          </div>
          }
          {page === "viewAll" && (
            <div>
                  <Nav state={state} setpage={setpage} setstate={setstate}/>
                  <ViewAll state={state} setpage={setpage} setSelectedMood={setSelectedMood} selectedMood={selectedMood} selectedBook={selectedBook}/>
            </div>
          )}
          {page === "love" && (
            <div>
                  <Nav state={state} setpage={setpage} setstate={setstate}/>
                  <Lovebook/>
            </div>
          )}
          {page==="AllComm" &&
          <div>
           <Nav state={state} setpage={setpage} setstate={setstate}/>
           <AllComm comments={comments} setComments={setComments} state={state} setpage={setpage} />
          </div>
          }
          {page==="catType" &&
           <div>
             <Nav state={state} setpage={setpage} setstate={setstate}/>
             <CategoryType state={state} setpage={setpage} setstate={setstate} selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} setSelectedBook={setSelectedBook}/>
           </div>
          }
          {page === "gamification" && (
            <div>
              {" "}
              <Nav setpage={setpage} state={state} setstate={setstate} />
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  marginTop: "40px",
                  fontFamily: "playpen",
                  padding: "0px 6% 3%",
                  flexWrap: "wrap",
                  gap: "20px",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    marginBottom: "80px",
                  }}
                >
                  <Goal token={token} state={state} />
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      width: "100%",
                      marginTop: "50px",
                    }}
                  >
                    <p
                      style={{
                        fontSize: "20px",
                        marginBottom: "20px",
                        color: state ? "#e2dfe4" : "#36454F",
                        marginRight: "35%",
                        justifyContent: "center",
                        fontFamily:font
                      }}
                    >
                      {t("myBadgesAndPoints")}
                    </p>
                    <div
                      className="bigdiv"
                      style={{
                        display: "flex",
                        gap: "5%",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          width: "100%",
                          gap: "10%",
                        }}
                      >
                        <Badge1 />
                        <Badge2 />
                      </div>
                      <div>
                        <Mypoint />
                      </div>
                    </div>
                  </div>
                </div>
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <Leaderboard state={state} />
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "16px",
                    }}
                  >
                    <ActiveMember />
                  </div>
                </div>
              </div>
            </div>
          )}
          {page === "search" && (
            <div>
              {" "}
              <Nav setpage={setpage} setstate={setstate} state={state} />
              <Searchpage setpage={setpage} books={books} state={state} setSelectedBook={setSelectedBook} />
            </div>
          )}
       
        </div>
      </div>
    </div>
  );
}

export default App;
