// import user3333 from "./images/user.png";
// import undrow from './images/text-field.png';
// import user1 from "./images/user1.png";
// import user2 from "./images/user2.png";
// import user3 from "./images/user3.png";
// import user4 from "./images/user4.png";
// import user5 from "./images/user5.png";
// import user6 from "./images/user6.png";
// import user7 from "./images/user7.png";
// import user8 from "./images/user8.png";
// import user9 from "./images/user9.png";
// import user10 from "./images/user10.png";
// import user11 from "./images/user11.png";
// import user12 from "./images/user12.png";
// import user13 from "./images/user13.png";
// import user14 from "./images/user14.png";
// import user15 from "./images/user15.png";
// import user16 from "./images/user16.png";
// import user17 from "./images/user17.png";
// import user18 from "./images/user18.png";
// import user19 from "./images/user19.png";
// import user20 from "./images/user20.png";
// import user21 from "./images/user21.png";
// import user22 from "./images/user22.png";
// import user23 from "./images/user23.png";
// import user24 from "./images/user24.png";
// import user25 from "./images/user25.png";
// import user26 from "./images/user26.png";
// import user27 from "./images/user27.png";
// import user28 from "./images/user28.png";
// import user29 from "./images/user29.png";
// import user30 from "./images/user30.png";
// import user31 from "./images/user31.png";
// import './Login.css';
// import { useState } from "react";
// import Swal from 'sweetalert2';
// import { useTranslation } from "react-i18next";
// import i18n from "./i18n";
// const avatars = [
//   user1,user2,user3,user4,user5,
//   user6,user7,user8,user9,user10,
//   user11,user12,user13,user14,user15,
//   user16,user17,user18,user19,user20,
//   user21,user22,user23,user24,user25,
//   user26,user27,user28,user29,user30,
//   user31
// ];
// export default function Sign(props) {

//   const { t } = useTranslation();

//   const font =
//     i18n.language === "ar"
//       ? "elmesriRegular, sans-serif"
//       : i18n.language === "zh" || i18n.language === "ja"
//       ? "zheng"
//       : i18n.language === "ko"
//       ? "Dongle"
//       : "playpen, sans-serif";

//   const [form, setform] = useState({
//     [props.field1]: "",
//     [props.field2]: "",
//     [props.field3]: "",
//     [props.field4]: ""
//   });
// const storedUser = JSON.parse(
//   localStorage.getItem("user") || "null"
// );

// const pendingAvatar = localStorage.getItem("pendingAvatar");

// const [selectedAvatar, setSelectedAvatar] = useState(
//   props.isSignup
//     ? (pendingAvatar !== null ? Number(pendingAvatar) : null)
//     : (storedUser?.avatar != null ? Number(storedUser.avatar) : null)
// );

//   function emailChange(event) {
//     setform({
//       ...form,
//       [props.field1]: event.target.value
//     });
//   }

//   function passwordChange(event) {
//     setform({
//       ...form,
//       [props.field2]: event.target.value
//     });
//   }

//   function firstNameChange(event) {
//     setform({
//       ...form,
//       [props.field3]: event.target.value
//     });
//   }

//   function lastNameChange(event) {
//     setform({
//       ...form,
//       [props.field4]: event.target.value
//     });
//   }

// async function submit(event){
// event.preventDefault();
// console.log(form[props.field1], form[props.field2]);

// const data={  [props.field1]: form[props.field1],
//               [props.field2]: form[props.field2],};
              
//               if(props.isSignup){
//                 data.name=form[props.field3];
//                 data.lastName=form[props.field4];
//                 data.avatar=selectedAvatar;
//                 console.log("REGISTER DATA:",data);
//             }
// const end = props.isSignup
//     ? "/api/register"
//     : "/api/login";
       
//         try {
            
//             const response = await fetch(`http://localhost:3000${end}`, { 
//                 method: 'POST', 
//                 headers: {
//                     'Content-Type': 'application/json', 
//                 },
//                 body: JSON.stringify(data),
//             });

//             const result = await response.json();

//                if (!response.ok) {
//                 Swal.fire({
//                  title: "Incorrect password or email",        
//                  text: result.msg,   
//                  icon: 'error',        
//                  confirmButtonText:'Ok',
//                  confirmButtonColor: '#d33', 
//                  timer: 3000  
//                 }) 
//                 return;
//             }
           
// if (result.user) {
//     localStorage.setItem(
//         "user",
//         JSON.stringify(result.user)
//     );
// }

// if (result.token) {
//     localStorage.setItem("token", result.token);
// }

// if (props.setUser) {
//     props.setUser(result.user);
// }
// if (props.isSignup) {
//     localStorage.removeItem("pendingAvatar");
// }

//    console.log("SUCCESS:",result);
//    console.log("TOKEN SAVED:",result.token);
//                 Swal.fire({
//                  title: "Success!",        
//                  text:   "The operation was completed successfully",   
//                  icon: 'success',        
//                  confirmButtonText:'Ok',
//                  confirmButtonColor: '#3085d6', 
//                  timer: 1000  
//                 }) 
//                 .then(() => {
//     props.setpage("home");
// })
            

//             console.log("SUCCESS:", result);
//             console.log("TOKEN FROM LOGIN:",result.token);
//             console.log("USER FROM LOGIN:",result.user);
//         } catch (error) {
//             console.error("ERROR:", error);
//         }
//     }
//      function gotoLogout() {
//     props.setpage("Logout");
//   }
// function gotoprofile() {
//   if (props.isSignup) {
//     props.setProfileReturnPage("signup");
//   } else {
//     props.setProfileReturnPage("signin");
//   }

//   props.setpage("profile");
// }
//     return(
//         <div className="login" style={{backgroundColor: props.state ? "#1D1845" : "#eaddf9",display:"flex" , flexDirection:"column-reverse", gap:"100px",paddingBottom:"70px"}}>
//           <a
//                   className="nav-link1"
//                   href="#"
//                   onClick={gotoLogout}
//                   style={{
                   
//                     transition: "0.3s",
//                     fontFamily: font,
//                     marginLeft:"80%",
//                   }}
//                 >
//                  {t("deleteAccount")}
//                 </a>
//             <div className='login-card'>
            
//              {props.children}
// <img
//   src={selectedAvatar !== null ? avatars[selectedAvatar] : user3333}
//   alt="profile"
//   width="60%"
//   style={{ marginBottom: "20px", borderRadius: "50%" }}
// />
//                <form onSubmit={submit} >
                  
//                   {props.namebutton==="Sign up" && ( <div className='forminput'> 
//                     <input value={form[props.field3]} style={{fontFamily:font}}  type="text"  name={props.field3} placeholder={`${t("data1")} ${props.field3}`} onChange={firstNameChange} required /> 
//                     <input value={form[props.field4]} style={{fontFamily:font}}  type="text"  name={props.field4} placeholder={`${t("data1")} ${props.field4}`} onChange={lastNameChange} required /> 
//                     </div>)}
                 
//                  <div className='forminput'>
//                    <input  value={form[props.field1]} type="email" style={{fontFamily:font}}  name={props.field1} placeholder={`${t("data1")} ${props.field1}`} onChange={emailChange} required/>
//                  </div>

//                  <div className='forminput'>
//                    <input value={form[props.field2]}   type="password" style={{fontFamily:font}} name={props.field2} placeholder={`${t("data1")} ${props.field2}`} onChange={passwordChange} required/>
//                   </div>
//                <div style={{display:"flex" , justifyContent:"center" , alignItems:"center" , gap:"5%"}}>
//                   <button type="submit" className="login-button" style={{fontFamily:font}}>
//                     {props.namebutton}
//                   </button>
//                   {props.isSignup && (
//   <button
//     type="button"
//     className="login-button"
//     style={{ fontFamily: font }}
//     onClick={gotoprofile}
//   >
//     {t("selectYourProfile")}
//   </button>
// )}
//                </div>
//                </form>
                
            
//              </div>
//        </div>
//     );

// }
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
import editAccount from "./editAccount";
import "./Login.css";

import { useState } from "react";
import Swal from "sweetalert2";
import { useTranslation } from "react-i18next";
import i18n from "./i18n";

const avatars = [
  user1, user2, user3, user4, user5,
  user6, user7, user8, user9, user10,
  user11, user12, user13, user14, user15,
  user16, user17, user18, user19, user20,
  user21, user22, user23, user24, user25,
  user26, user27, user28, user29, user30,
  user31
];

export default function Sign(props) {

  const { t } = useTranslation();

  const font =
    i18n.language === "ar"
      ? "elmesriRegular, sans-serif"
      : i18n.language === "zh" || i18n.language === "ja"
      ? "zheng"
      : i18n.language === "ko"
      ? "Dongle"
      : "playpen, sans-serif";

  const [form, setform] = useState({
    [props.field1]: "",
    [props.field2]: "",
    [props.field3]: "",
    [props.field4]: ""
  });

  // الصورة المؤقتة أثناء إنشاء الحساب
const storedUser = JSON.parse(
  localStorage.getItem("user") || "{}"
);

const pendingAvatar = localStorage.getItem("pendingAvatar");

const [selectedAvatar, setSelectedAvatar] = useState(
  pendingAvatar !== null
    ? Number(pendingAvatar)
    : (
        storedUser.avatar !== null &&
        storedUser.avatar !== undefined &&
        storedUser.avatar !== ""
          ? Number(storedUser.avatar)
          : null
      )
);

  function emailChange(event) {
    setform({
      ...form,
      [props.field1]: event.target.value
    });
  }

  function passwordChange(event) {
    setform({
      ...form,
      [props.field2]: event.target.value
    });
  }

  function firstNameChange(event) {
    setform({
      ...form,
      [props.field3]: event.target.value
    });
  }

  function lastNameChange(event) {
    setform({
      ...form,
      [props.field4]: event.target.value
    });
  }

  async function submit(event) {

    event.preventDefault();

    const data = {
      [props.field1]: form[props.field1],
      [props.field2]: form[props.field2]
    };

    // إنشاء حساب جديد
    if (props.isSignup) {

      data.name = form[props.field3];
      data.lastName = form[props.field4];
      data.avatar = selectedAvatar;

      console.log("REGISTER DATA:", data);
    }

    const end = props.isSignup
      ? "/api/register"
      : "/api/login";

    try {

      const response = await fetch(
        `http://localhost:3000${end}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(data)
        }
      );

      const result = await response.json();

      if (!response.ok) {

        Swal.fire({
          title: "Incorrect password or email",
          text: result.msg,
          icon: "error",
          confirmButtonText: "Ok",
          confirmButtonColor: "#d33",
          timer: 3000
        });

        return;
      }

      // حفظ المستخدم الحالي
      if (result.user) {
        localStorage.setItem(
          "user",
          JSON.stringify(result.user)
        );

      }

      // حفظ token الخاص بالمستخدم الحالي
      if (result.token) {

        localStorage.setItem(
          "token",
          result.token
        );

      }

      if (props.setUser) {
        props.setUser(result.user);
      }

      // بعد إنشاء الحساب نحذف الصورة المؤقتة
      if (props.isSignup) {

        localStorage.removeItem(
          "pendingAvatar"
        );

      }

      console.log("SUCCESS:", result);
      console.log("TOKEN:", result.token);
      console.log("USER:", result.user);

      Swal.fire({
        title: "Success!",
        text: "The operation was completed successfully",
        icon: "success",
        confirmButtonText: "Ok",
        confirmButtonColor: "#3085d6",
        timer: 1000
      }).then(() => {

        props.setpage("home");

      });

    } catch (error) {

      console.error("ERROR:", error);

    }
  }

  function gotoLogout() {
    props.setpage("Logout");
  }

  // اختيار الصورة أثناء إنشاء الحساب
  function gotoprofile() {

    props.setProfileReturnPage("signup");

    props.setpage("profile");
  }

  // ⭐ فتح صفحة تعديل الحساب
  function editAccount() {

    const token = localStorage.getItem("token");

    if (!token) {

      Swal.fire({
        title: "Please login first",
        text: "You must be logged in to edit your account",
        icon: "warning",
        confirmButtonText: "Ok"
      });

      return;
    }

    props.setpage("editAccount");
  }

  return (

    <div
      className="login"
      style={{
        backgroundColor: props.state
          ? "#1D1845"
          : "#eaddf9",

        display: "flex",
        flexDirection: "column-reverse",
        gap: "100px",
        paddingBottom: "70px"
      }}
    >
      <div style={{display:"flex",gap:"100px"}}>
{/* حذف الحساب */}
      <a
        className="nav-link1"
        href="#"
        onClick={(event) => {
          event.preventDefault();
          gotoLogout();
        }}
        style={{
          transition: "0.3s",
          fontFamily: font
        }}
      >
        {t("deleteAccount")}
      </a>

      {/* ⭐ تعديل الحساب */}
      <button
        type="button"
        className="login-button"
        style={{
          fontFamily: font
        }}
        onClick={editAccount}
      >
        تعديل الحساب
      </button>
      </div>
      

      <div className="login-card">

        {props.children}

        <img
          src={
            selectedAvatar !== null
              ? avatars[selectedAvatar]
              : user3333
          }
          alt="profile"
          width="60%"
          style={{
            marginBottom: "20px",
            borderRadius: "50%"
          }}
        />

        <form onSubmit={submit}>

          {/* الاسم والكنية في إنشاء الحساب فقط */}

          {props.isSignup && (

            <div className="forminput">

              <input
                value={form[props.field3]}
                style={{ fontFamily: font }}
                type="text"
                name={props.field3}
                placeholder={`${t("data1")} ${props.field3}`}
                onChange={firstNameChange}
                required
              />

              <input
                value={form[props.field4]}
                style={{ fontFamily: font }}
                type="text"
                name={props.field4}
                placeholder={`${t("data1")} ${props.field4}`}
                onChange={lastNameChange}
                required
              />

            </div>

          )}

          <div className="forminput">

            <input
              value={form[props.field1]}
              type="email"
              style={{ fontFamily: font }}
              name={props.field1}
              placeholder={`${t("data1")} ${props.field1}`}
              onChange={emailChange}
              required
            />

          </div>

          <div className="forminput">
            <input
              value={form[props.field2]}
              type="password"
              style={{ fontFamily: font }}
              name={props.field2}
              placeholder={`${t("data1")} ${props.field2}`}
              onChange={passwordChange}
              required
            />

          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: "5%"
            }}
          >

            <button
              type="submit"
              className="login-button"
              style={{ fontFamily: font }}
            >
              {props.namebutton}
            </button>

            {/* اختيار الصورة في إنشاء الحساب فقط */}

            {props.isSignup && (

              <button
                type="button"
                className="login-button"
                style={{ fontFamily: font }}
                onClick={gotoprofile}
              >
                {t("selectYourProfile")}
              </button>

            )}

          </div>

        </form>

      </div>

    </div>
  );
}