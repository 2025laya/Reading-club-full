import { useEffect, useState } from "react";
import badge1 from "./images/badge1.png";
import { useTranslation } from 'react-i18next';
import Text from "./Text.js"
export default function Badge1() {
  const userid = localStorage.getItem("userid");
  const [badges, setbadges] = useState([]);
  const {t}=useTranslation();
  useEffect(() => {
    const getLeaderboard = async () => {
      const response = await fetch(
        "http://localhost:3000/api/gamification/leaderboard",
      );
      try {
        if (!response.ok) {
          console.log(response.status);
          return;
        }
        const data = await response.json();

        const currentuser = data.find((user) => user._id === userid);

        if (currentuser) {
          setbadges(currentuser.badges);
        } else {
          setbadges([]);
        }
      } catch (error) {
        console.error(error);
      }
    };
    getLeaderboard();
  }, [userid]);

  console.log(badges);

  return (
    <div>
      <Text
        style={{
          backgroundColor: "white",
          borderRadius: "25px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          padding: "30px",
          width: "100%",
          height: "90%",
          maxWidth: "220px",
          filter: !badges?.includes(t("interactiveIntellectual"))
            ? "grayscale(100%)"
            : "none",
          opacity: !badges?.includes(t("interactiveIntellectual")) ? "0.5" : "1",
          pointerEvents: !badges?.includes(t("interactiveIntellectual")) ? "none" : "auto",
        }}
      >
        <img
          src={badge1}
          alt="badge1"
          style={{
            width: "80%",
            marginBottom: "20px",
            border: "solid 4px black",
            borderRadius: "50%",
          }}
        />
        <p>{t("interactiveIntellectual")}</p>
      </Text>
      <div>
        {!badges?.includes(t("interactiveIntellectual")) ? (
          <Text style={{ marginTop: "3px"}}>{t("incomplete")}</Text>
        ) : (
          <Text style={{ marginTop: "3px"}}>{t("complete")}</Text>
        )}
      </div>
    </div>
  );
}
