import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoon, faSun, faTrophy,faHandHoldingHeart,faBookBookmark , faFileCircleExclamation} from "@fortawesome/free-solid-svg-icons";
import "./Section1";
import "./nav.css";
import RPage from "./rightPage.js";
import React , { useState } from "react";
import { useTranslation } from "react-i18next";
import i18n from "./i18n";
import Report from "./report";
export default function Nav({ setpage, setstate, state }) {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const font = i18n.language === "ar" ? 
  "elmesriRegular, sans-serif" :
   i18n.language==="zh" || i18n.language==="ja" ? "zheng":
    i18n.language==="ko"?"Dongle" :
     "playpen, sans-serif";
     const token=localStorage.getItem("token");
  const [showReport,setShowReport]=useState(false);
  function gotoSignin() {
    setpage("signin");
  }
  function goToHome() {
    setpage("home");
  }
     function gotoLogout() {
    setpage("Logout");
  }

  function gotosignup() {
    setpage("signup");
  }
  function gotoabout() {
    setpage("about");
  }
  function moon_mode() {
    setstate(true);
  }
  function sun_mode() {
    setstate(false);
  }
  function gamification() {
    if(!token)
      setpage("signin")
    else 
    setpage("gamification");
  }
 
  function lovebook() {
  if(!token)
      setpage("signin")
    else 
    setpage("love");
  }
  return (
    <div
      style={{
        fontFamily: "playpen",
        backgroundColor: state ? "#1D1845" : "#eaddf9",
        transition: "0.3s",
      }}
    >
      <nav className="navbar navbar-expand-lg">
        <div className="container-fluid">
          <h2
            className="navbar-brand"
            style={{
              color: state ? "#e2dfe4" : "#2E1B4B ",
              transition: "0.3s",
              fontFamily: font,
            }}
          >
            {t("books")}
          </h2>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
            style={{
              color: state ? "#e2dfe4" : "#2E1B4B ",
              transition: "0.3s",
            }}
          >
            <span
              className="navbar-toggler-icon"
              style={{ color: state ? "#e2dfe4" : "#2E1B4B " }}
            ></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <button
                  className="nav-link active Arabfont"
                  aria-current="page"
                  href="#"
                  onClick={goToHome}
                  style={{
                    color: state ? "#e2dfe4" : "#1E1B4B",
                    transition: "0.3s",
                    fontFamily: font,
                  }}
                >
                  {t("home")}
                </button>
              </li>
             
              <li className="nav-item">
                <button
                  className="nav-link"
                  href="#Sec1"
                  onClick={gotoabout}
                  style={{
                    color: state ? "#e2dfe4" : "#1E1B4B",
                    transition: "0.3s",
                    fontFamily: font,
                   
                  }}
                >
                  {t("about")}
                </button>
              </li>
              <li className="nav-item">
                <button
                  className="nav-link"
                  href="#"
                  onClick={gotoSignin}
                  style={{
                    color: state ? "#e2dfe4" : "#1E1B4B",
                    transition: "0.3s",
                    fontFamily: font,
                  }}
                >
                  {t("signIn")}
                </button>
              </li>
              <li className="nav-item">
                <button
                  className="nav-link"
                  onClick={gotosignup}
                  style={{
                    color: state ? "#e2dfe4" : "#1E1B4B",
                    transition: "0.3s",
                    fontFamily: font,
                  }}
                >
                  {t("signUp")}
                </button>
              </li>
              <li className="nav-item">
                <button
                  className="nav-link"
                  href="#"
                  onClick={gotoLogout}
                  style={{
                    color: state ? "#e2dfe4" : "#1E1B4B",
                    transition: "0.3s",
                    fontFamily: font,
                  }}
                >
                 Delete Account
                </button>
              </li>
              <li className="nav-item">
                <select
                  className="nav-link"
                  style={{
                    color: state ? "#e2dfe4" : "#1E1B4B",
                    transition: "0.3s",
                    fontFamily: font,
                  }}
                  defaultValue=""
                  onChange={(e) => {
                    i18n.changeLanguage(e.target.value);
                    document.dir = e.target.value === "ar" ? "rtl" : "ltr";
                  }}
                >
                  <option value="" disabled selected hidden>
                    {t("Lan")}
                  </option>
                  <option value="ar" style={{ fontFamily: "elmesriRegular" }}> العربية </option>
                  <option value="en">English</option>
                  <option value="fr">Français</option>
                  <option value="es">Español</option>
                  <option value="de">Deutsch</option>
                  <option value="it">Italiano</option>
                  <option value="tr">Türkçe</option>
                  <option value="zh" style={{ fontFamily:"zheng"}}> 中文</option>
                  <option value="ja" style={{ fontFamily:"zheng"}}>日本語</option>
                  <option value="ko" style={{ fontFamily:"Dongle"}}>한국어</option>
                  <option value="ru">Русский язык</option>
                </select>
              </li>
            </ul>
            <div
              class="d-flex"
              role="search"
              style={{ listStyleType: "none",
                display:"flex",
                gap:"20px",
                marginLeft:"10px",
                marginRight:"10px"
               }}
            >
              <li className="nav-item">
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  
                  <button
                    style={{
                      color: state ? "#e2dfe4" : "#1E1B4B",
                      border: "none",
                      background: "none",
                      transition: "0.3s",
                    }}
                    onClick={moon_mode}
                  >
                    {" "}
                    <FontAwesomeIcon
                      icon={faMoon}
                      style={{ fontSize: "20px" }}
                    />
                  </button>
                </div>
              </li>
              <li className="nav-item">
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    width: "10%",
                    marginRight: "20px",
                    gap:"20px"
                  }}
                >
                  <button
                    style={{
                      color: state ? "#e2dfe4" : "#1E1B4B",
                      border: "none",
                      background: "none",
                      transition: "0.3s",
                    }}
                    onClick={sun_mode}
                  >
                    <FontAwesomeIcon
                      icon={faSun}
                      style={{ fontSize: "20px" , paddingLeft:"5px",paddingRight:"5px"}}
                    />
                  </button>
                </div>
              </li>
              <li className="nav-item">
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    width: "10%",
                    marginRight: "20px",
                  }}
                >
                  <button
                    style={{
                      color: state ? "#e2dfe4" : "#1E1B4B",
                      border: "none",
                      background: "none",
                      transition: "0.3s",
                    }}
                    onClick={gamification}
                  >
                    <FontAwesomeIcon
                      icon={faTrophy}
                      style={{ fontSize: "20px" }}
                    />
                  </button>
                   <button
                                      style={{
                                        color: state ? "#e2dfe4" : "#1E1B4B",
                                        border: "none",
                                        background: "none",
                                        transition: "0.3s",
                                      }}
                                      onClick={lovebook}
                                    >
                                      <FontAwesomeIcon
                                        icon={faBookBookmark}
                                        style={{ fontSize: "20px" , paddingLeft:"20px" , paddingRight:"20px"}}
                                      />
                                    </button>
                                    <button
                                    style={{
                                        color: state ? "#e2dfe4" : "#1E1B4B",
                                        border: "none",
                                        background: "none",
                                        transition: "0.3s",
                                      }}
                                      onClick={()=>setShowReport(true)}
                                      >
                                      <FontAwesomeIcon icon={faFileCircleExclamation} />
                                    </button>
                                    {showReport && (
  <Report
    onClose={() => setShowReport(false)}
  />
)}
                                   
                </div>
              </li>
            </div>
          </div>
        </div>
        <RPage state={state}/>
      </nav>
    </div>
  );
}