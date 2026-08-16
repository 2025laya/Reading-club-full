import { useTranslation } from "react-i18next";
import i18n from "./i18n";
import { motion } from "framer-motion";
export default function Sec2({ state, setpage }) {
  const { t } = useTranslation();
  const font = i18n.language === "ar" ? 
  "elmesriRegular, sans-serif" :
   i18n.language==="zh" || i18n.language==="ja" ? "zheng":
    i18n.language==="ko"?"Dongle" :
     "playpen, sans-serif";
  return (
    <div>
      <div
        className="sec2"
        style={{
          color: state ? "#e2dfe4" : "#1E1B4B",
          transition: "0.3s",
          fontFamily: font,
        }}
      >
        <motion.h2
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, axis: "y", amount: 0.8,  }}
          transition={{ duration: 0.5}}
        >
          {" "}
          {t("types")}
        </motion.h2>
      </div>
    </div>
  );
}