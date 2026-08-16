import React, { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import abook from "./images/abook.png";
import './leaderboared.css'
import { useTranslation } from "react-i18next";
import i18n from "./i18n";
import Text from "./Text";
export default function YearlyGoal({ token,state }) {
  const [userid, setid] = useState(null);   

  const [data, setdata] = useState(null);
  
  const [goal, setGoal] = useState(10);
const { t } = useTranslation();

  useEffect(() => {
    if (token && token.split(".").length === 3) {
      try {
        const decode = jwtDecode(token);
        const iid=decode.user?.id || decode.id || "guest";
        setid(iid);

        if(iid!=="guest"){
          localStorage.setItem("userid",iid);
        }
      } catch (error) {
        console.log(error);
         setid("guest");
      }
    } else {
      setid("guest");
    }
  }, [token]);



  useEffect(() => {
    const fetchuser = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/gamification/leaderboard`, {
          method: "GET",
        });

        if (!response.ok) {
          console.log(response.status);
          setdata({ booksRead: 0 });
          return;
        }

        const dataList = await response.json();

        const currentuser = dataList.find((user) => user._id === userid);
        if (currentuser) {
          setdata(currentuser);
        } else {
          console.log("المستخدم الحالي ليس في قائمة العشرة الأوائل");

          setdata({ booksRead: 0 });
        }
      } catch (error) {
        console.error("فشل جلب البيانات:", error);
      }
    };

    if (userid && userid !== "guest") {
      fetchuser();
    } else if (userid === "guest") {
      setdata({ booksRead: 0 });
    }
  }, [userid]);

  const goalchange = (event) => {
    setGoal(event.target.value);
  };

  if (!data) {
    return (
      <div style={{ textAlign: "center", marginTop: "20px" }}>
        <Text>{t("loadingGoal")}</Text>
       
      </div>
    );
  }

  return (
    <div>
       
    <div style={{ display: "flex", justifyContent: "center",width:"100%"}}>
         <div style={{ width: "60%",
          display: "flex",
          flexDirection: "column"}}>
            <Text style={{fontSize:"20px",marginBottom:"20px",color:state ? "#e2dfe4" :"#36454F",marginRight:"20%"}}> {t("readingChallenge")}</Text>
      <div
        style={{
          padding: "20px",
          backgroundColor: "white",
          borderRadius: "25px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          height: "200px",
          alignItems: "center",
          width:"80%",
          boxShadow: "5px 5px 5px rgba(0,0,0,0.1)"
        }}
      >
        
        <Text className="font" style={{ color: "#585af5",fontSize:"21px"}}> {t("myYearlyGoal")}</Text>
        <div>
          <label
            htmlFor="goal" className="font2" 
            style={{ display: "inline-block", marginBottom: "10px",fontSize:"15px",padding:"0px 10px"}}
          >
            <Text>{t("setYearlyGoal")} </Text>
         
          </label>
          <input
            value={goal}
            onChange={goalchange}
            name="goal"
            id="goal"
            type="number"
            min="0"
            max="50"
            step="1"
            style={{
              backgroundColor: "#744ba097",
              border: "solid 2px #6366F1",
              marginLeft: "10px",
            }}
          />
        </div>
        <Text>{t("progressBar")}</Text>
        <progress value={data.booksRead || 0} max={goal}></progress>
         
      </div>
      </div>
      <img
        src={abook}
        className="abook"
        alt="abook"
        style={{ width: "250px", height: "200px",marginTop:"20px" }}
      />
    </div>
    </div>
  );
}
