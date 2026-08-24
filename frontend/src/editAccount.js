import { useState } from "react";
import Swal from "sweetalert2";
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

import "./Login.css";

const avatars = [
  user1, user2, user3, user4, user5,
  user6, user7, user8, user9, user10,
  user11, user12, user13, user14, user15,
  user16, user17, user18, user19, user20,
  user21, user22, user23, user24, user25,
  user26, user27, user28, user29, user30,
  user31
];

export default function EditAccount(props) {

  const { t } = useTranslation();

  const font =
    i18n.language === "ar"
      ? "elmesriRegular, sans-serif"
      : i18n.language === "zh" || i18n.language === "ja"
      ? "zheng"
      : i18n.language === "ko"
      ? "Dongle"
      : "playpen, sans-serif";

  // المستخدم الحالي
  const storedUser = JSON.parse(
    localStorage.getItem("user") || "{}"
  );

  // =========================
  // بيانات الحساب الحالي
  // =========================

  const [name, setName] = useState(
    storedUser.name || ""
  );

  const [lastName, setLastName] = useState(
    storedUser.lastName || ""
  );

  const [email, setEmail] = useState(
    storedUser.email || ""
  );

  const [password, setPassword] = useState("");

  // الصورة الحالية
  const savedEditingAvatar =
    localStorage.getItem("editingAvatar");

  const [avatar, setAvatar] = useState(
    savedEditingAvatar !== null
      ? Number(savedEditingAvatar)
      : (
          storedUser.avatar !== null &&
          storedUser.avatar !== undefined &&
          storedUser.avatar !== ""
            ? Number(storedUser.avatar)
            : null
        )
  );

  // =========================
  // فتح صفحة اختيار الصورة
  // =========================

  function openProfile() {

    // نحفظ الصورة الحالية مؤقتًا
    if (avatar !== null) {

      localStorage.setItem(
        "editingAvatar",
        String(avatar)
      );

    } else {

      localStorage.removeItem(
        "editingAvatar"
      );
    }

    // Profile تعرف أنها جاءت من EditAccount
    props.setProfileReturnPage("editAccount");

    // الانتقال إلى صفحة الصور
    props.setpage("profile");
  }

  // =========================
  // حفظ جميع التعديلات
  // =========================

  async function saveChanges(event) {

    event.preventDefault();

    const token =
      localStorage.getItem("token");

    if (!token) {

      Swal.fire({
        title: "Error",
        text: "You are not logged in",
        icon: "error",
        confirmButtonText: "Ok"
      });

      return;
    }

    // ==========================================
    // مهم جدًا:
    // نأخذ آخر Avatar من localStorage
    // لأن Profile قد تكون غيرت الصورة
    // ==========================================
    const savedAvatar =
      localStorage.getItem("editingAvatar");

    let finalAvatar = avatar;

    if (savedAvatar !== null) {
      finalAvatar = Number(savedAvatar);
    }

    // البيانات التي سنرسلها للسيرفر
    const data = {
      name: name,
      lastName: lastName,
      email: email,
      avatar: finalAvatar
    };

    // كلمة المرور اختيارية
    if (password.trim() !== "") {
      data.password = password;
    }

    console.log("================================");
    console.log("UPDATE ACCOUNT DATA:");
    console.log(data);
    console.log("================================");

    try {

      const response = await fetch(
        "http://localhost:3000/api/me",
        {
          method: "PUT",

          headers: {
            "Content-Type": "application/json",
            "x-auth-token": token
          },

          body: JSON.stringify(data)
        }
      );

      const result =
        await response.json();

      console.log("UPDATE RESULT:");
      console.log(result);

      if (!response.ok) {

        Swal.fire({
          title: "Error",
          text: result.msg || "Update failed",
          icon: "error",
          confirmButtonText: "Ok"
        });

        return;
      }

      // ==========================================
      // المستخدم الذي أعاده السيرفر
      // ==========================================

      const updatedUser = {
        ...storedUser,
        ...result.user,

        // نضمن حفظ الصورة الجديدة
        avatar: finalAvatar,

        // نضمن حفظ البيانات الجديدة
        name: name,
        lastName: lastName,
        email: email
      };

      // حفظ المستخدم الجديد
      localStorage.setItem(
        "user",
        JSON.stringify(updatedUser)
      );

      // تنظيف الصورة المؤقتة
      localStorage.removeItem(
        "editingAvatar"
      );

      // تنظيف كلمة المرور
      setPassword("");

      // تحديث App إذا كان setUser موجودًا
      if (props.setUser) {
        props.setUser(updatedUser);
      }

      console.log(
        "SAVED USER:",
        updatedUser
      );

      Swal.fire({
        title: "Success!",
        text: "Account updated successfully",
        icon: "success",
        confirmButtonText: "Ok",
        confirmButtonColor: "#3085d6",
        timer: 1200
      }).then(() => {

        // بعد الحفظ نعود للصفحة الرئيسية
        props.setpage("home");

      });

    } catch (error) {

      console.error(
        "UPDATE ACCOUNT ERROR:",
        error
      );

      Swal.fire({
        title: "Error",
        text: "Server error",
        icon: "error",
        confirmButtonText: "Ok"
      });
    }
  }

  // =========================
  // إلغاء
  // =========================

  function cancelEdit() {

    localStorage.removeItem(
      "editingAvatar"
    );

    // العودة إلى صفحة إنشاء الحساب
    props.setpage("signup");
  }

  return (

    <div
      className="login"
      style={{
        backgroundColor: props.state
          ? "#1D1845"
          : "#eaddf9",

        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "30px",
        paddingBottom: "70px",
        minHeight: "100vh"
      }}
    >

      <div className="login-card">

        <h2
          style={{
            fontFamily: font,
            marginBottom: "20px"
          }}
        >
          تعديل الحساب
        </h2>

        {/* =========================
            الصورة الحالية
        ========================= */}

        <img
          src={
            avatar !== null &&
            avatars[avatar]
              ? avatars[avatar]
              : user3333
          }
          alt="profile"
          width="180"
          height="180"
          style={{
            marginBottom: "20px",
            borderRadius: "50%",
            objectFit: "cover"
          }}
        />

        {/* تغيير الصورة */}
        <button
          type="button"
          className="login-button"
          style={{
            fontFamily: font,
            marginBottom: "25px"
          }}
          onClick={openProfile}
        >
          تغيير الصورة
        </button>

        {/* =========================
            نموذج تعديل الحساب
        ========================= */}

        <form onSubmit={saveChanges}>

          {/* الاسم والكنية */}

          <div className="forminput">

            <input
              type="text"
              value={name}
              placeholder="الاسم الأول"
              onChange={(e) =>
                setName(e.target.value)
              }
              style={{
                fontFamily: font
              }}
              required
            />

            <input
              type="text"
              value={lastName}
              placeholder="الكنية"
              onChange={(e) =>
                setLastName(e.target.value)
              }
              style={{
                fontFamily: font
              }}
              required
            />

          </div>

          {/* البريد الإلكتروني */}

          <div className="forminput">

            <input
              type="email"
              value={email}
              placeholder="البريد الإلكتروني"
              onChange={(e) =>
                setEmail(e.target.value)
              }
              style={{
                fontFamily: font
              }}
              required
            />

          </div>

          {/* كلمة المرور */}

          <div className="forminput">

            <input
              type="password"
              value={password}
              placeholder="كلمة المرور الجديدة"
              onChange={(e) =>
                setPassword(e.target.value)
              }
              style={{
                fontFamily: font
              }}
            />

          </div>

          {/* =========================
              الأزرار
          ========================= */}

          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: "20px",
              marginTop: "30px"
            }}
          >

            <button
              type="submit"
              className="login-button"
              style={{
                fontFamily: font
              }}
            >
              موافق
            </button>

            <button
              type="button"
              className="login-button"
              style={{
                fontFamily: font
              }}
              onClick={cancelEdit}
            >
              إلغاء
            </button>

          </div>

        </form>

      </div>

    </div>
  );
}