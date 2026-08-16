import { useTranslation } from "react-i18next";
import i18n from "./i18n";
import "./Nav";
import { motion } from "framer-motion";

export default function Sec({  setpage , state, selectedMood, setSelectedMood , props ,}) {
  const { t } = useTranslation();
 const font = i18n.language === "ar" ? 
  "elmesriRegular, sans-serif" :
   i18n.language==="zh" || i18n.language==="ja" ? "zheng":
    i18n.language==="ko"?"Dongle" :
     "playpen, sans-serif";

    function viewAll() {
    setpage("viewAll");
  }
  return (
    <div className="headerOfSec1" id="Sec1">
      <div className="navOfSec1">
        <motion.h2
          className="The-Title-Of-Section"
          style={{
            fontFamily: font,
            color: state ? "#e2dfe4" : "#1E1B4B",
            fontSize: " 27px",
            transition: "0.3s",
          }}
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, axis: "y", amount: 0.8 }}
          transition={{ duration: 0.5 }}
        >
          {t("mood")} :{" "}
        </motion.h2>

        <div className="sel">
          <motion.select
            initial={{ opacity: 0, y: -30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, axis: "y", amount: 0.8 }}
            transition={{ duration: 0.5 }}
            className="sel2"
            value={selectedMood}
            onChange={(e) => setSelectedMood(e.target.value)}
             style={{fontFamily:font}}
          >
            <option value="" disabled selected hidden  style={{fontFamily:font}}>
              {t("chooseHere")}
            </option>
            <option value="joyful" style={{fontFamily:font}}>{t("joyful")}</option>
            <option value="peaceful" style={{fontFamily:font}}>{t("peaceful")}</option>
            <option value="romantic" style={{fontFamily:font}}>{t("romantic")}</option>
            <option value="sad" style={{fontFamily:font}}>{t("sad")}</option>
            <option value="curious" style={{fontFamily:font}}>{t("curious")}</option>
            <option value="adventurous" style={{fontFamily:font}}>{t("adventurous")}</option>
            <option value="mysterious" style={{fontFamily:font}}>{t("mysterious")}</option>
            <option value="imaginative" style={{fontFamily:font}}>{t("imaginative")}</option>
            <option value="inspired" style={{fontFamily:font}}>{t("inspired")}</option>
            <option value="thoughtful" style={{fontFamily:font}}>{t("thoughtful")}</option>
          </motion.select>
        </div>
      </div>
      <div>
            <div>
        <motion.a
                 initial={{ opacity: 0, y: -30 }}
                 whileInView={{ opacity: 1, y: 0 }}
                 viewport={{ once: true, axis: "y", amount: 0.8 }}
                 transition={{ duration: 0.5 }}
                 href="####"
                 className="view"
                 style={{
                   color: state ? "#e2dfe4" : "#1E1B4B",
                   display:"inline-block",
                   fontFamily: font,
                 }}
                 onClick={viewAll}
               >
                 {t("view")}
               </motion.a>
      </div>
      </div>
    </div>
  );
}
