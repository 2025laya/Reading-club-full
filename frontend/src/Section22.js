import { Swiper, SwiperSlide } from 'swiper/react';
import './Section22.css';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import Lovephoto from "./images/result (6).png";
import Comed from "./images/result (10).png";
import Action from "./images/result (2).png";
import Drama from "./images/result.png";
import Fantazy from "./images/result (9).png";
import Cartoon from "./images/result (7).png";
import Horor from "./images/result (8).png";
import Adventure from "./images/result(11).png";
import Geography from "./images/result(12).png";
import History from "./images/result(13).png";
import ScienceFiction from "./images/result(14).png";
import Education from "./images/education.jpg"
import Phylosophy from "./images/phlosophy.png"
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import { motion } from "framer-motion";
import { useTranslation } from 'react-i18next';
import i18n from "./i18n";
export default function Types({setpage,setSelectedCategory}) {
   const {t}=useTranslation();
  const font = i18n.language === "ar" ? 
  "elmesriRegular, sans-serif" :
   i18n.language==="zh" || i18n.language==="ja" ? "zheng":
    i18n.language==="ko"?"Dongle" :
     "playpen, sans-serif";
const currentDir = i18n.language === 'ar' ? 'rtl' : 'ltr';
function goToCatType(category) {
  setSelectedCategory(category);
  setpage("catType");
}
  return (
    <motion.div 
          initial={{ opacity: 0, y: -50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, axis: "y", amount: 0.8 }}
            transition={{ duration: 0.5 }}
            > 
      <Swiper
        dir={currentDir}
        key={currentDir}
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper"
>
         <div className="carosel">
        <SwiperSlide >
            <h2 className="word1" style={{fontFamily:font}} onClick={()=>goToCatType("romantic")}>
               {t("romantic")}
            </h2>
            <img className='Love' src={Lovephoto} alt="Love"/>
        </SwiperSlide>
        <SwiperSlide>
            <h2 className="word" style={{fontFamily:font}} onClick={()=>goToCatType("comedy")}>
               {t("comedy")}
            </h2>
            <img className='Comed' src={Comed} alt="Comed" />
        </SwiperSlide>
        <SwiperSlide>
            <h2 className="word1" style={{fontFamily:font}} onClick={()=>goToCatType("action")}>
               {t("action")}
            </h2>
            <img className='Action' src={Action} alt="Action" />
        </SwiperSlide>
        <SwiperSlide>
            <h2 className="word1" style={{fontFamily:font}} onClick={()=>goToCatType("drama")}>
              {t("drama")}
            </h2>
            <img className='Drama' src={Drama} alt="Drama" />
        </SwiperSlide>
        <SwiperSlide>
            <h2 className="word1" style={{fontFamily:font}} onClick={()=>goToCatType("cartoon")}>
               {t("cartoon")}
            </h2>
            <img className='Car' src={Cartoon} alt="Cartoon" />
        </SwiperSlide>
        <SwiperSlide>
            <h2 className="word1" style={{fontFamily:font}} onClick={()=>goToCatType("fantasy")}>
               {t("fantasy")}
            </h2>
            <img className='Fan' src={Fantazy} alt="Fantasy" />
        </SwiperSlide>
        <SwiperSlide>
            <h2 className="word1" style={{fontFamily:font}} onClick={()=>goToCatType("horor")}>
               {t("horor")}
            </h2>
            <img className='Horor' src={Horor} alt="Horor"/>
        </SwiperSlide>
         <SwiperSlide>
            <h2 className="word" style={{width:"300px" , fontFamily:font}} onClick={()=>goToCatType("adventure")}>
               {t("adventure")}
            </h2>
            <img className='Adventure' src={Adventure} alt="Adventure"/>
        </SwiperSlide>
         <SwiperSlide>
            <h2 className="word1" style={{fontFamily:font}} onClick={()=>goToCatType("geography")}>
               {t("geography")}
            </h2>
            <img className='Geography' src={Geography} alt="Geography" />
        </SwiperSlide>
         <SwiperSlide>
            <h2 className="word1" style={{fontFamily:font}} onClick={()=>goToCatType("history")}>
               {t("history")}
            </h2>
            <img className='History' src={History} alt="History" />
        </SwiperSlide>
         <SwiperSlide>
            <h2 className="word1" style={{width:"400px" , fontFamily:font}} onClick={()=>goToCatType("scienceFiction")}>
              {t("scienceFiction")}
            </h2>
            <img className='Science Fiction' src={ScienceFiction} alt="ScienceFiction"/>
        </SwiperSlide>
        </div>
        <SwiperSlide>
         <h2 className="word1" style={{width:"400px" , fontFamily:font}} onClick={()=>goToCatType("education")}>
              {t("education")}
            </h2>
            <img src={Education} alt="education"/>
        </SwiperSlide>
        <SwiperSlide>
          <h2 className="word1" style={{width:"400px" , fontFamily:font}} onClick={()=>goToCatType("philosophy")}>
              {t("philosophy")}
            </h2>
            <img src={Phylosophy} alt="phylosophy"/>
        </SwiperSlide>
      </Swiper>
      
    </motion.div>
  );
}
