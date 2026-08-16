import { useState } from "react";
import { useTranslation } from "react-i18next";
import i18n from "./i18n";
import user3333 from "./images/user.png";
import user1 from "./images/user1.png";
import user2 from "./images/user2.png";
import user3 from "./images/user3.png";
import user4 from "./images/user4.png";
import user5 from "./images/user5.png";
import user6 from "./images/user6.png";
import user7 from "./images/user7.png";
import user8 from "./images/user8.png";
import user9 from "./images/user9.png";
import user10 from "./images/user10.png";
import user11 from "./images/user11.png";
import user12 from "./images/user12.png";
import user13 from "./images/user13.png";
import user14 from "./images/user14.png";
import user15 from "./images/user15.png";
import user16 from "./images/user16.png";
import user17 from "./images/user17.png";
import user18 from "./images/user18.png";
import user19 from "./images/user19.png";
import user20 from "./images/user20.png";
import user21 from "./images/user21.png";
import user22 from "./images/user22.png";
import user23 from "./images/user23.png";
import user24 from "./images/user24.png";
import user25 from "./images/user25.png";
import user26 from "./images/user26.png";
import user27 from "./images/user27.png";
import user28 from "./images/user28.png";
import user29 from "./images/user29.png";
import user30 from "./images/user30.png";
import user31 from "./images/user31.png";
import Text from "./Text"
const avatars = [
  user1,user2,user3,user4,user5,
  user6,user7,user8,user9,
  user10,user11,user12,user13,
  user14,user15,user16,user17,
  user18,user19,user20,user21,
  user22,user23,user24,user25,
  user26,user27,user28,user29,
  user30,user31
];
console.log(avatars[0]);
export default function Profile(props) {

  const storedUser = JSON.parse(localStorage.getItem("user")) || {};
  const [avatar, setAvatar] = useState(storedUser.avatar ?? null);
  const { t } = useTranslation();
 const font = i18n.language === "ar" ? 
  "elmesriRegular, sans-serif" :
   i18n.language==="zh" || i18n.language==="ja" ? "zheng":
    i18n.language==="ko"?"Dongle" :
     "playpen, sans-serif";

async function chooseAvatar(index) {
  try {
    const token = localStorage.getItem("token");

    if (!token) {
      console.log("NO TOKEN");
      return;
    }

    const response = await fetch("http://localhost:3000/api/me", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": token,
      },
      body: JSON.stringify({
        avatar: index,
      }),
    });

    const data = await response.json();

    console.log("AVATAR UPDATE:", data);

    if (!response.ok) {
      console.log("AVATAR UPDATE ERROR:", data);
      return;
    }

    const updatedUser = {
      ...storedUser,
      ...data.user,
      avatar: index,
    };

    localStorage.setItem("user", JSON.stringify(updatedUser));

    setAvatar(index);

  } catch (error) {
    console.error("AVATAR ERROR:", error);
  }
}


async function removeAvatar() {
  try {
    const token = localStorage.getItem("token");

    if (!token) {
      console.log("NO TOKEN");
      return;
    }

    const response = await fetch("http://localhost:3000/api/me", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": token,
      },
      body: JSON.stringify({
        avatar: null,
      }),
    });

    const data = await response.json();

    console.log("REMOVE AVATAR:", data);

    if (!response.ok) {
      console.log("REMOVE AVATAR ERROR:", data);
      return;
    }

    const updatedUser = {
      ...storedUser,
      ...data.user,
      avatar: null,
    };

    localStorage.setItem("user", JSON.stringify(updatedUser));

    setAvatar(null);

  } catch (error) {
    console.error("REMOVE AVATAR ERROR:", error);
  }
}
  return (
    <div style={{ textAlign: "center" , height:"100vh" , marginTop:"20%px"}}>

      <img
        src={avatar != null ? avatars[avatar] : user3333}
        alt="profile"
        width="150"
        style={{ borderRadius: "50%" }}
      />

      
      <div style={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
        marginTop: "20px"
      }}>
        {avatars.map((img, index) => (
          <img
            key={index}
            src={img}
            width="80"
            onClick={() => chooseAvatar(index)}
            style={{
              margin: "5px",
              cursor: "pointer",
              borderRadius: "50%",
              border: avatar === index ? "3px solid blue" : "none"
            }}
          />
        ))}
      </div>
      <div style={{display:"flex", justifyContent:"space-between" , margin:"30px"}}>
 <button
  onClick={() =>
    props.setpage(props.returnPage)
  }
  className="login-button"
  style={{
    marginTop: "20px",
    fontFamily: font
  }}
>
  <Text>{t("save")}</Text>
</button>
<div style={{ marginTop: "10px" }}>

        <button className="login-button" onClick={removeAvatar} style={{width:"300px"}}>
          <Text>{t("removeProfilePicture")}</Text>
        </button>

      </div>
      </div>
     
    </div>
  );
}