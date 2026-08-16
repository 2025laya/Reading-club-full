import "./footer.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLink,
  faBook,
  faBookOpen,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { useTranslation } from "react-i18next";
import i18n from "./i18n";
import Text from "./Text";
export default function Footer({ setpage, state }) {
  const { t } = useTranslation();
  const font =
    i18n.language === "ar"
      ? "elmesriRegular, sans-serif"
      : i18n.language === "zh" || i18n.language === "ja"
        ? "zheng"
        : i18n.language === "ko"
          ? "Dongle"
          : "playpen, sans-serif";
  function goTochat() {
    const element = document.getElementById("discussions");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  }
  const gotohome = () => {
    const element = document.getElementById("homee");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };
  const gotobooks = () => {
    const element = document.getElementById("books");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };
  function gotoabout() {
    setpage("about");
  }
  function gotoregister() {
    setpage("signup");
  }

  return (
    <div
      className="footer1"
      style={{
        background: state
          ? "#1D1845"
          : "linear-gradient(135deg, #dfc4fd 0%, #eedeff 50%, #fbeaff 100%)",
      }}
    >
      <div
        className="bigdiv1"
        style={{
          background: state
            ? "#120E2E"
            : "linear-gradient(135deg, #dfc4fd 0%, #a77bd5 50%, #dfc4fd 100%)",
          fontFamily: font,
        }}
      >
        <div
          className="smalldiv1"
          style={{ width:"80%",backgroundColor: state ? "#1D1845" : "#E9D5FF", }}
        >
          <div className="f2121">
            <h4
              className="COMPANY1"
              style={{ fontFamily: font, color: state ? "#e2dfe4" : "#1E1B4B"}}
            >
              {t("explorePlatform")}
              <FontAwesomeIcon
                className="icon1"
                icon={faLink}
                style={{
                  fontSize: "1.8rem",
                  opacity: "0.2",
                  display: "inline-flex",
                  marginTop: "60px",
                  marginLeft: "7px",
                  fontFamily: font,
                }}
              />
            </h4>
            <p
              onClick={gotohome}
              className="c p1"
              style={{ fontFamily: font,color: state ? "rgb(230, 230, 230)" : "rgb(92, 92, 92)" }}
            >
              {t("home")}
            </p>
            <p
              onClick={gotoabout}
              className="c p1"
              style={{ fontFamily: font, color: state ? "rgb(230, 230, 230)" : "rgb(92, 92, 92)" }}
            >
              {t("about")}
            </p>
            <p
              className="c p1"
              onClick={gotobooks}
              style={{ fontFamily: font,color: state ? "rgb(230, 230, 230)" : "rgb(92, 92, 92)" }}
            >
              {t("books")}
            </p>
            <p
              className="c p1"
              onClick={goTochat}
              style={{ fontFamily: font, color: state ? "rgb(230, 230, 230)" : "rgb(92, 92, 92)",}}
            >
              {t("discussions")}
            </p>
          </div>

          <div
            style={{
              width: "3px",
              height: "290px",
              flexShrink: "0",
              backgroundColor: state ? "#120E2E" : "rgb(177, 132, 218)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: "25px",
            }}
          ></div>

          <div className="f2121">
            <h4
              className="COMPANY1"
              style={{ fontFamily: font, color: state ? "#e2dfe4" : "#1E1B4B" }}
            >
              {t("latestActivities")}
              <FontAwesomeIcon
                className="icon2"
                icon={faBook}
                style={{
                  fontSize: "1.8rem",
                  opacity: "0.2",
                  display: "inline-flex",
                  marginTop: "30px",
                  marginLeft: "10px",
                  fontFamily: font,
                }}
              />
            </h4>
            <p
              onClick={gotohome}
              className="c p1"
              style={{
                marginRight: "19px",
                fontFamily: font,
                color: state ? "rgb(230, 230, 230)" : "rgb(92, 92, 92)",
              }}
            >
              {t("discussingBooks")}
            </p>
            <p
              onClick={gotoabout}
              className="c p1"
              style={{
                marginRight: "19px",
                fontFamily: font,
                color: state ? "rgb(230, 230, 230)" : "rgb(92, 92, 92)",
              }}
            >
              {t("yearlyBooksChallenge")}
            </p>
          </div>

          <div
            style={{
              width: "3px",
              height: "290px",
              backgroundColor: state ? "#120E2E" : "rgb(177, 132, 218)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: "25px",
              flexShrink: "0",
            }}
          ></div>

          <div className="sec1">
            <h4
              className="COMPANY1"
              style={{ fontFamily: font, color: state ? "#e2dfe4" : "#1E1B4B" }}
            >
              {t("readersClub")}
              <FontAwesomeIcon
                className="icon2"
                icon={faBookOpen}
                style={{
                  fontSize: "1.8rem",
                  opacity: "0.2",
                  display: "inline-flex",
                  marginLeft: "10px",
                }}
              />
            </h4>
            <p
              className="c p1"
              style={{
                fontFamily: font,
                color: state ? "rgb(230, 230, 230)" : "rgb(92, 92, 92)",
              }}
            >
              {t("readersClubDescription1")}
              <br></br>
              {t("readersClubDescription2")}
            </p>
          </div>

          <div
            style={{
              width: "2.8px",
              height: "290px",
              flexShrink: "0",
              backgroundColor: state ? "#120E2E" : "rgb(177, 132, 218)",
            }}
          ></div>

          <div className="f2121">
            <div style={{ display: "flex", justifyContent: "flex-end" }}>
              <h4
                className="COMPANY1"
                style={{
                  fontFamily: font,
                  color: state ? "#e2dfe4" : "#1E1B4B",
                }}
              >
                {t("becomePartOfCommunity")}
                <FontAwesomeIcon
                className="icon3"
               
                  icon={faUser}
                  style={{
                    fontSize: "1.8rem",
                    opacity: "0.2",
                    display: "inline-flex",
                    marginTop: "30px",
                    marginLeft: "4px",
                    
                    
                  }}
                />
              </h4>
            </div>
            <p
              className="c p1"
              style={{
                fontFamily: font,
                color: state ? "rgb(230, 230, 230)" : "rgb(92, 92, 92)",
              }}
            >
              {t("communityDescription")}
            </p>
            <button
              className="footorbutt1"
              onClick={gotoregister}
              style={{
                width: "70%",
                fontFamily: font,
                fontSize: "15px",
                marginLeft:"30px",
                backgroundColor: state ? "#120E2E" : "rgb(177, 132, 218)",
                color: state ? "#e2dfe4" : "#1E1B4B",
              }}
            >
              {t("registerNow")}
            </button>
          </div>
        </div>
      </div>
      <div>
        <p
          className="end1 p1"
          style={{
            fontFamily: font,
            color: state ? "rgb(230, 230, 230)" : "rgb(92, 92, 92)"
          }}
        >
          
          {t("allRightsReserved")} &#169;<Text> 2026 | Full-Stack{" "}</Text>
          {t("projectBuiltWith")} <Text>React & Node.js</Text>
          
        </p>
      </div>
    </div>
  );
}
