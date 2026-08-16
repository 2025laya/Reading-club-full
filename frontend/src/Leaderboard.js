import trophy from "./images/trophy.png";
import './leaderboared.css'
import { useTranslation } from "react-i18next";

import Text from "./Text";
export default function Leaderboard({state}) {
  const { t } = useTranslation();
  return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          alignItems: "center",
          gap: "5px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center",color:state ? "#e2dfe4" :"#36454F"}}>
          <Text className="leaderboard"> {t("leaderboard")}</Text>

          <img
            src={trophy}
            alt="trophy"
            style={{ width: "85px", height: "85px" }}
          />
        </div>
        <Text style={{color:state ? "#e2dfe4" :"#36454F"}}>{t("mostActiveAndReadMembers")}</Text>
      </div>
 
  );
}
