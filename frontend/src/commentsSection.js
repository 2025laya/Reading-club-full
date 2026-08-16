import "./commentsSection.css";
import { useTranslation } from "react-i18next";
import i18n from "./i18n";
import { motion } from "framer-motion";
import Text from "./Text";
export default function Comments({ state, setpage }) {
   function goToAllComm(){
  setpage("AllComm");
 }
 function gotocomments(){
     const token = localStorage.getItem("token");

    if (!token) {
      setpage("signin");
    } else {
      setpage("section4"); 
    }
  }

 
  const { t } = useTranslation();
  return (
    <div className="comments">
      <div
        className="theTitleOfComments"
        style={{
          color: state ? "#e2dfe4" : "#1E1B4B",
          transition: "0.3s",
        }}
        onClick={goToAllComm}
      >
        <motion.button
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, axis: "y", amount: 0.8,  }}
          transition={{ duration: 0.5}}
          style={{borderStyle:"none",backgroundColor:"transparent"}}
        >
          <Text style={{color: state ? "#e2dfe4" : "#1E1B4B",}}>
           {t("com1")}
          </Text>
        </motion.button>
      </div>

      <motion.button
        onClick={gotocomments}
        style={{
          marginTop: "30px",
          marginRight: "20px",
          textDecoration: "none",
          background: "none",
          border: "none",
          cursor: "pointer",
          color: state ? "#e2dfe4" : "#1E1B4B",
          transition: "0.3s",
        }}
               initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, axis: "y", amount: 0.8,  }}
          transition={{ duration: 0.5}}
      >
        <Text>
        {t("com2")}
        </Text>
      </motion.button>
    </div>
  );
}
