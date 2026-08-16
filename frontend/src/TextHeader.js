import Search from './Search';
import { useEffect } from 'react';
import './header.css';
import { useTranslation } from 'react-i18next';
import i18n from "./i18n";
import Text from "./Text";
export default function Textheader({setstate,state,setpage,setbook}) {
    const {t}=useTranslation();
       useEffect(() => {
    document.body.classList.remove("ar", "zh", "ja", "ko");

    if (i18n.language === "ar") {
      document.body.classList.add("ar");
    } else if (i18n.language === "zh") {
      document.body.classList.add("zh");
    } else if (i18n.language === "ja") {
      document.body.classList.add("ja");
    } else if (i18n.language === "ko") {
      document.body.classList.add("ko");
    }
  }, [i18n.language]);
    return(
        <div style={{width:'70%',display:'flex' ,flexDirection:'column',justifyContent:'center',alignContent:'center', alignItems:'center',paddingLeft:'26px',marginTop:'40px',marginBottom:"70px"}}>
<Text  className='move par text head1' style={{fontSize:"40px",marginBottom:'20px',width:'100%' ,color:state ? "#e2dfe4" :"#1E1B4B",opacity:"0" , transition:"0.3s"}}>
{t("header1")} <span  className='par' style={{color:"#6366F1"}}>{t("header4")}</span>
</Text>
<Text className='move par text1' style={{fontSize:"15px",width:'90%',opacity: "0",color:state ? "#e2dfe4" :"#1E1B4B" , transition:"0.3s"}}>
   {t("header2")}<br/>
{t("header3")}
</Text>

<Search state={state} setpage={setpage} setbook={setbook}/>
</div>
    );
    
}