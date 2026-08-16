import Imgp1 from "./images/photo1.png";
import Imgp2 from "./images/photo2.png";
import Imgp4 from "./images/photo4.png";
import Imgp5 from "./images/photo5.png";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import Text from "./Text"
export default function Hero({ setpage, state }) {
  const { t } = useTranslation();

  function go_to_chat() {
    const token = localStorage.getItem("token");

    if (token) {
      setpage("chat");
    } else {
      setpage("signin"); 
    }
  }

  return (
    <div>
      <div className="para1">
        <div className="ph14">
          <img className="photo11" src={Imgp1} alt="ph1" />

          <div
            className="par1"
            style={{
              color: state ? "#e2dfe4" : "#1E1B4B",
              fontSize: "43px",
              marginTop: "6%",
              transition: "0.3s",
            }}
          >
            <Text>{t("title1")}</Text>
   

            <div className="par2">
              <motion.h1
                initial={{ opacity: 0, y: -30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, axis: "y", amount: 0.8 }}
                transition={{ duration: 0.5 }}
              >
               <Text className="title222">{t("title2")}</Text>
              </motion.h1>
            </div>
          </div>

          <img className="photo22" src={Imgp2} alt="ph2" />
        </div>

        <motion.p
          className="par3"
          initial={{ opacity: 0}}
          whileInView={{ opacity: 1,}}
          viewport={{
            once: true,
            axis: "y",
            amount: 0.2, 
            margin: "0px 0px -150px 0px",
          }}
           transition={{ duration: 0.7, delay: 0.4 }}
          style={{
            color: state ? "#e2dfe4" : "#1E1B4B",
            textAlign: "center",
            paddingLeft: "10%",
            paddingRight: "10%",
            // transition: "0.3s",
          }}
        >
            <motion.span
            style={{ display: "block" }}
            initial={{ opacity: 0, y: -30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{
              once: true,
              axis: "y",
              margin: "0px 0px -150px 0px",
            }}
            transition={{ duration: 0.7, delay: 0.5 }}>
             <Text>{t("header5")}</Text>
          </motion.span>
         
          <motion.span
            style={{ display: "block" }}
            initial={{ opacity: 0, y: -30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{
              once: true,
              axis: "y",
              amount: 0.8,
              margin: "0px 0px -150px 0px",
            }}
            transition={{ duration: 0.7, delay: 0.6 }}
          >
            {" "}
            <Text>{t("header6")}</Text>
          </motion.span>
          <motion.span
            style={{ display: "block" }}
            initial={{ opacity: 0, y: -30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{
              once: true,
              axis: "y",
              amount: 0.8, 
              margin: "0px 0px -150px 0px",
            }}
            transition={{ duration: 0.7, delay: 1 }}
          >
            {" "}
            <Text>{t("header7")}</Text>
            
          </motion.span>
        </motion.p>

        <div className="Butt ph25">
          <img className="photo44" src={Imgp4} alt="ph4" />
          <button
            className="button1"
            onClick={go_to_chat}
          >
            <Text>{t("chat")}📲</Text>
          </button>
          <img className="photo55" src={Imgp5} alt="ph5" />
        </div>
      </div>
    </div>
  );
}
