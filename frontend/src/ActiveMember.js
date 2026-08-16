import { useEffect, useState } from "react";
import profile from "./images/profile.png";
import './leaderboared.css'
import { useTranslation } from 'react-i18next';
import Text from "./Text.js"
export default function ActiveMember(props) {
  const [data, setdata] = useState([]);
  const {t}=useTranslation();
  useEffect(() => {
    const getLeaderboard = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/gamification/leaderboard");

        if (!response.ok) {
          console.log(response.status);
          return;
        }
        const newdata = await response.json();
        setdata(newdata);
      } catch (error) {
        console.log(error);
      }
    };
    getLeaderboard();
  }, []);

  return (
    <div className="item" style={{display: "flex", flexDirection: "column", width: "50vw", alignItems: "center",gap:"15px" }}>
       {data.map((user, index) => (
        <div key={index}
          style={{
            backgroundColor: "white",
            display: "flex",
            flexDirection:"column",
            borderRadius: "25px",
            width: "100%",
            padding: "40px ",
            justifyContent:"center",
            height:"120px"
          }}
        >
          <div style={{display:"flex",justifyContent:"flex-end",gap:"5px"}}>
 <h4  style={{margin:0,fontSize:"18px"}}>:{user.name} 
  <span style={{fontSize:"22px"}}>
  {index+1===1 && "🥇"}
  {index+1===2 && "🥈"}
  {index+1===3 && "🥉"}</span></h4>
          <img src={profile} alt="profile" style={{ width: "25px" ,height:"30px" }} />
          <h2
            style={{
              color: "black",
              // backgroundColor: "#36454F40",
              borderRadius: "20%",
               fontSize: "16px",
               display:"flex",
               justifyContent:"center",
               alignItems:"center",
               width:"10%",
              height:"30px",
             
            }}
          >
            .{index + 1}
          </h2>
          </div>
          <div style={{backgroundColor:"#9f5afd1a",borderRadius:"10px",padding:"5px",display:"flex",flexDirection:'column' ,justifyContent:"flex-end",boxShadow: "5px 5px 5px rgba(0,0,0,0.1)" }}>
            <Text className="font" style={{margin:0,fontSize:"15px"}}>{user.points} {t("points")}</Text>
            <Text className="font" style={{margin:0,fontSize:"15px"}}>{user.booksRead} {t("books")}</Text>
          </div>
          
        </div>
      ))}
    </div>
  );
}
