import reading from "./images/reading.png";
import  './About.css';
import { useTranslation } from 'react-i18next';
import i18n from "./i18n";
import Text from "./Text.js"
export default function About({setpage,state}){
    const {t}=useTranslation();
    const isArabic = i18n.language === "ar";
    function go_to_home(){
        setpage("home")
    }
return (
<div style={{display:"flex",minHeight:"100dvh",fontFamily: "playpen"}}>
    <div  className="element" style={{display:"flex",flexDirection:"column",backgroundColor:state?"#050609":"#fAf9F6",justifyContent:"center",width:"50%",alignItems:"flex-start",padding:"10px",position:"relative"}}>
          <div className="element"  style={{opacity:"0.6",filter:"blur(7px)",aspectRatio:"1/1",width:"35%", backgroundColor:state?"#04072B":"#fbf8d4",position:"absolute",top:"-14%", right: isArabic ? "-10%" : "auto",left: isArabic ? "auto" : "-10%", borderRadius:"50%"}}></div>
<Text style={{paddingLeft:"10px",fontSize:"23px",marginBottom:"30px",color:state?"white":"black"}}>{t("aboutUs")}</Text>
<Text  style={{color:"#5A24EB ",marginBottom:"30px",fontSize:"40px"}}>{t("auTitle")}</Text>
<Text style={{marginBottom:"30px",fontSize:"20px",color:state?"white":"black"}}> {t("par1")}
 </Text>
 <button  className="button1" onClick={go_to_home} style={{border:"none",padding:"12px",backgroundColor:state?"#04072B":"#fbf8d4",display:"flex",justifyContent:"center",alignItems:"center",borderRadius:"25px",fontSize:"16px", boxShadow:state?"0px 2px 7px 0px white":"0px 2px 7px 0px #17153a",color:state?"white":"black"}}>
    <Text>
            {t("buttHome")}
    </Text>
    </button>
 </div>
 
  
   <div style={{backgroundColor:state?"#04072B":"#fbf8d4",display:"flex",alignItems:"flex-end",flexDirection:"column",justifyContent:"space-around",width:"50%",fontSize:"20px"}}>
   
        <Text style={{color:state?"white":"black"}}>{t("par2")}</Text>
        <img  className="reading1" src={reading} alt="rading" style={{width:"70%"}}/>
    </div>
 </div>

);
}
