import {  useState } from "react";
import './header.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { useTranslation } from 'react-i18next';
import i18n from "./i18n";
export default function Search({setpage,setbook,state}){
    const {t}=useTranslation();
    const font = i18n.language === "ar" ? 
  "elmesriRegular, sans-serif" :
   i18n.language==="zh" || i18n.language==="ja" ? "zheng":
    i18n.language==="ko"?"Dongle" :
     "playpen, sans-serif";
    const [searchvalue,setsearchvalue]=useState("");
  async function search_submit(event){
     event.preventDefault();
      if(searchvalue.trim()===""){
         setbook([]);
         localStorage.removeItem("searchdata")
         return;
      }
      
         
         try{
            const respone= await fetch(`http://localhost:3000/api/books/search?title=${encodeURIComponent(searchvalue)}`);
            if(!respone.ok){
               console.log(respone.status);
               return;
            }
            const newdata=await respone.json();
            console.log(newdata);
           setbook(newdata);
           
console.log("البيانات القادمة من السيرفر:", newdata); 
         }
         catch(error){
            console.error(error);

         }
         const token=localStorage.getItem("token")
         if(!token){
         setpage("signin");
      }
      else{
       
     
     if(searchvalue!== ""){
       setpage("search");
     }}
    }

 function change(event){
    setsearchvalue(event.target.value);}
 

   

    return(
     <div>
        <form onSubmit={search_submit} >
         <FontAwesomeIcon 
         icon={faMagnifyingGlass}
         style={{marginRight:"10px",opacity:'0', color: state ? "#e2dfe4" : "#1E1B4B",}}
         className="move"/>
        <input  type="text" className="search move text2" name="search" value={searchvalue} onChange={change}   placeholder={t("search")} style={{height:"35px",padding:"10px",opacity:'0', fontFamily:font}}/>
        </form>
     </div>
    )
}