import { useState, useEffect } from "react";
import start from "./images/star.png";
import { useTranslation } from "react-i18next";
import i18n from "./i18n";

export default function Mypoint() {
  const { t } = useTranslation();

  const font =
    i18n.language === "ar"
      ? "elmesriRegular, sans-serif"
      : i18n.language === "zh" || i18n.language === "ja"
      ? "zheng"
      : i18n.language === "ko"
      ? "Dongle"
      : "playpen, sans-serif";

  const [points, setpoints] = useState(0);

  const getPoints = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        console.log("لم يتم العثور على التوكن");
        return;
      }

      const response = await fetch(
        "http://localhost:3000/api/gamification/me",
        {
          headers: {
            "x-auth-token": token,
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        console.log("Error:", data);
        return;
      }

      setpoints(data.points);

      console.log("Current points:", data.points);

    } catch (error) {
      console.error("حدث خطأ في جلب النقاط:", error);
    }
  };

  useEffect(() => {
    getPoints();
    const handleFocus = () => {
      getPoints();
    };

    window.addEventListener("focus", handleFocus);

    return () => {
      window.removeEventListener("focus", handleFocus);
    };
  }, []);

  return (
    <div
      style={{
        padding: "30px",
        backgroundColor: "#ffffff80",
        borderRadius: "25px",
        height: "50%",
        width: "50%",
      }}
    >
      <img
        src={start}
        alt="start"
        style={{ width: "25%" }}
      />

      <p style={{ fontFamily: font }}>
        {t("totalPoints")}:
      </p>

      <p>{points}</p>
    </div>
  );
}