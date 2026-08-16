import badge2 from "./images/badge2.png";
import { useEffect, useState } from "react";
import { useTranslation } from 'react-i18next';
import Text from "./Text.js"
export default function Badge2() {
  const userid = localStorage.getItem("userid");
  const [badges, setbadges] = useState(null);
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
        console.log(badges);
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
          maxWidth: "200px",
          filter: !badges?.includes(t("avidReader"))
            ? "grayscale(100%)"
            : "none",
          opacity: !badges?.includes(t("avidReader")) ? "0.5" : "1",
          pointerEvents: !badges?.includes(t("avidReader")) ? "none" : "auto",
        }}
      >
        <img
          src={badge2}
          alt="badge2"
          style={{
            width: "80%",
            marginBottom: "20px",
            border: "solid 4px black",
            borderRadius: "50%",
          }}
        />
        <p>{t("avidReader")}</p>
      </Text>
      <div>
        {!badges?.includes(t("avidReader")) ? (
          <Text style={{ marginTop: "3px"}}>{t("incomplete")}</Text>
        ) : (
          <Text style={{ marginTop: "10px"}}>{t("complete")}</Text>
        )}
      </div>
    </div>
  );
}

