import user3333 from "./images/user.png";
import undrow from './images/text-field.png';
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
import { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBook,
  faComment,
  faMessage,
  faPaperPlane,
  faBookOpen,
  faBookmark,
  faEllipsisVertical
} from "@fortawesome/free-solid-svg-icons";
import { io } from "socket.io-client";
import "./chat.css";
import { useTranslation } from "react-i18next";
import i18n from "./i18n";
import Text from "./Text";

const socket = io("http://localhost:3000");
const avatars = [
  user1,user2,user3,user4,user5,
  user6,user7,user8,user9,user10,
  user11,user12,user13,user14,user15,
  user16,user17,user18,user19,user20,
  user21,user22,user23,user24,user25,
  user26,user27,user28,user29,user30,
  user31
];
export default function Chat({ setpage, state }) {
  const { t } = useTranslation();

  const font =
    i18n.language === "ar"
      ? "elmesriRegular, sans-serif"
      : i18n.language === "zh" || i18n.language === "ja"
      ? "zheng"
      : i18n.language === "ko"
      ? "Dongle"
      : "playpen, sans-serif";

  const [message, setmessage] = useState("");
  const [arraymessage, setarrymessage] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);

  const icons = [
    faBook,
    faComment,
    faMessage,
    faPaperPlane,
    faBookOpen,
    faBookmark,
  ];

  const repeatIcons = Array(47).fill(icons).flat();

  const messageEndRef = useRef(null);
  const messageContainerRef = useRef(null);


  useEffect(() => {
    async function getCurrentUser() {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          console.log("NO TOKEN");
          return;
        }

        const response = await fetch(
          "http://localhost:3000/api/me",
          {
            method: "GET",
            headers: {
              "x-auth-token": token,
            },
          }
        );

        const data = await response.json();

        console.log("CURRENT USER:", data);

        if (response.ok) {
          setCurrentUser(data);

  
          localStorage.setItem("user", JSON.stringify(data));
        } else {
          console.log("CURRENT USER ERROR:", data);
        }
      } catch (error) {
        console.log("CURRENT USER ERROR:", error);
      }
    }

    getCurrentUser();
  }, []);

 
  useEffect(() => {
    async function getMessages() {
      try {
        const token = localStorage.getItem("token");

        console.log("TOKEN:", token);

        if (!token) {
          console.log("NO TOKEN FOR MESSAGES");
          return;
        }

        const response = await fetch(
          "http://localhost:3000/api/messages",
          {
            method: "GET",
            headers: {
              "x-auth-token": token,
            },
          }
        );

        const data = await response.json();

        console.log("MESSAGES FROM DATABASE:", data);

        if (response.ok) {
          setarrymessage(Array.isArray(data) ? data : []);
        } else {
          console.log("GET MESSAGES ERROR:", data);
        }
      } catch (error) {
        console.log("GET MESSAGES ERROR:", error);
      }
    }

    getMessages();

   
    socket.on("receiveMessage", (data) => {
      setarrymessage((prev) => {
        const exists = prev.some(
          (msg) => msg._id === data._id
        );

        if (exists) {
          return prev;
        }

        return [...prev, data];
      });
    });

    return () => {
      socket.off("receiveMessage");
    };
  }, []);
          
  
  useEffect(() => {
    const container = messageContainerRef.current;

    if (container) {
      container.scrollTop = container.scrollHeight;
    }
  }, [arraymessage]);

  async function sendMessage(e) {
    e.preventDefault();

    if (message.trim() === "") {
      return;
    }
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        console.log("NO TOKEN");
        return;
      }

      const response = await fetch(
        "http://localhost:3000/api/messages",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-auth-token": token,
          },
          body: JSON.stringify({
            text: message,
          }),
        }
      );

      const data = await response.json();

      console.log("SEND MESSAGE:", data);

      if (response.ok) {
        setmessage("");
      } else {
        console.log("SEND MESSAGE ERROR:", data);
      }
    } catch (error) {
      console.log("SEND MESSAGE ERROR:", error);
    }
  }

 
  function isUserAtBottom() {
    const el = messageContainerRef.current;

    if (!el) return false;

    return (
      el.scrollHeight -
        el.scrollTop -
        el.clientHeight <
      80
    );
  }

  useEffect(() => {
    const shouldScroll = isUserAtBottom();

    if (shouldScroll) {
      messageEndRef.current?.scrollIntoView({
        behavior: "smooth",
      });
    }
  }, [arraymessage]);


  async function deleteMessage(id) {
    try {
      const token = localStorage.getItem("token");

      const response = await fetch(
        `http://localhost:3000/api/messages/${id}`,
        {
          method: "DELETE",
          headers: {
            "x-auth-token": token,
          },
        }
      );

      const data = await response.json();

      console.log("DELETE MESSAGE:", data);

      if (response.ok) {
        setarrymessage((prev) =>
          prev.filter((msg) => msg._id !== id)
        );
      } else {
        console.log("DELETE ERROR:", data);
      }
    } catch (err) {
      console.error(err);
    }
  }

  async function editMessage(id, oldText) {
    const newText = prompt("edit message", oldText);

    if (!newText || newText.trim() === "") {
      return;
    }

    try {
      const token = localStorage.getItem("token");

      const response = await fetch(
        `http://localhost:3000/api/messages/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            "x-auth-token": token,
          },
          body: JSON.stringify({
            text: newText,
          }),
        }
      );

      const data = await response.json();

      console.log("EDIT MESSAGE:", data);

      if (response.ok) {
        setarrymessage((prev) =>
          prev.map((msg) =>
            msg._id === id
              ? { ...msg, text: newText }
              : msg
          )
        );
      } else {
        console.log("EDIT ERROR:", data);
      }
    } catch (err) {
      console.error(err);
    }
  }

  function go_to_home() {
    setpage("home");
  }

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        background: state
          ? "radial-gradient(circle,#eeaeca 0%, #1D1845 100%)"
          : "radial-gradient(circle,#eeaeca 0%, #94bbe9 100%)",
        backgroundSize: "cover",
        flexDirection: "column",
        justifyContent: "space-between",
        fontFamily: "caveatfont",
       
      }}
    >
     

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          boxShadow: "rgb(228, 229, 230) -5px 2px 5px 0px",
          backgroundColor: "#3d393934",
          color: state ? "#e2dfe4" : "#1E1B4B",
          height: "8vh",
          alignItems: "center",
          paddingLeft: "22px",
          transition: "0.3s",
          
        }}
      >
        
        <h1 style={{ fontFamily: font }}>
          {t("booksChat")}
        </h1>
        <button
          className="chatbutton"
          onClick={go_to_home}
          style={{
            boxShadow: "-2px -1px 6px 0px",
            marginRight: "22px",
            backgroundColor: "#eeaeca",
            height: "30px",
            border: "none",
            borderRadius: "25px",
            padding: "12px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            fontSize: "18px",
            fontFamily: font,
          }}
        >
          {t("buttHome")}
        </button>
      </div>


      <div
        ref={messageContainerRef}
        className="hide-scrollbar"
        style={{
          flex: "1",
          width: "100%",
          height: "100%",
          position: "relative",
          fontFamily: font,
           paddingLeft:"2.5vw",
        paddingRight:"2.5vw"
        }}
      >
    

        <div
          style={{
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
            height: "100%",
            width: "100%",
            justifyContent: "space-around",
            pointerEvents: "none",
            padding: "20px",
            opacity: "1",
            alignContent: "space-around",
            position: "fixed",
            zIndex: "1",
          }}
        >
          {repeatIcons.map((icon, index) => (
            <FontAwesomeIcon
              key={index}
              icon={icon}
              style={{
                margin: "25px",
                fontSize: "1.5rem",
                color: "#fff",
                opacity: "0.2",
              }}
              spin
            />
          ))}
        </div>

       

        {arraymessage.map((msg) => {

  

          const senderId =
            typeof msg.sender === "object"
              ? msg.sender?._id
              : msg.sender;

          const senderName =
            typeof msg.sender === "object"
              ?( msg.sender?.name || msg.sender?.username || "User" )
              : msg.sender ===currentUser?._id
              ? (currentUser?.name || currentUser?.username || "User")
             : "User";
          

          const isMyMessage =
            currentUser &&
            senderId === currentUser._id;

          return (
            <div
              key={msg._id}
              style={{
                display: "flex",
                justifyContent: isMyMessage
                  ? "flex-end"
                  : "flex-start",
                width: "100%",
                margin: "8px 0",
                zIndex: "1000",
              }}
            >
              <img
  src={
    msg.sender?.avatar !== null && msg.sender?.avatar !== undefined
      ? avatars[msg.sender.avatar]
      : user3333
  }
  alt="profile"
  width="3%"
  height="3%"
  style={{ marginBottom: "20px" , borderRadius:"50%"}}
/> 
              <Text>
                <div
                  style={{
                    backgroundColor: isMyMessage
                      ? "rgba(255,255,255,0.9)"
                      : "rgba(61,57,57,0.2)",
                    width: "fit-content",
                    maxWidth: "70%",
                    padding: "3px 15px",
                    borderRadius: "15px",
                    marginRight: "20px",
                    marginLeft: "20px",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row-reverse",
                      justifyContent: "space-between",
                    }}
                  >
                    <h4
                      style={{
                        opacity: "0.8",
                        fontWeight: "normal",
                        fontSize:"22px"
                      }}
                    >
                      {senderName || "User"}
                    </h4>

               
                    {isMyMessage && (
                      <div
                        style={{
                          position: "relative",
                          display: "flex",
                          alignItems: "center",
                          marginRight: "10px",
                        }}
                      >
                        <FontAwesomeIcon
                          icon={faEllipsisVertical}
                          style={{
                            color: "#1E1B4B",
                            position: "absolute",
                            right: "8px",
                            pointerEvents: "none",
                            zIndex: 2,
                          }}
                        />

                        <select
                          defaultValue=""
                          onChange={(e) => {
                            const action = e.target.value;

                            if (action === "edit") {
                              editMessage(
                                msg._id,
                                msg.text
                              );
                            }

                            if (action === "delete") {
                              deleteMessage(msg._id);
                            }

                            e.target.value = "";
                          }}
                          style={{
                            border: "none",
                            background: "transparent",
                            appearance: "none",
                            WebkitAppearance: "none",
                            MozAppearance: "none",
                            cursor: "pointer",
                            width: "25px",
                            color: "transparent",
                            position: "relative",
                            zIndex: 1,
                            paddingLeft: "25px",
                            paddingRight: "15px",
                          }}
                        >
                          <option value="" hidden>
                            menu
                          </option>

                          <option value="edit">
                            Edit
                          </option>

                          <option value="delete">
                            Delete
                          </option>
                        </select>
                      </div>
                    )}
                  </div>

                  <Text style={{ fontSize: "20px" }}>
                    {msg.text}
                  </Text>
                </div>
              </Text>
            </div>
          );
        })}

        <div ref={messageEndRef} />
      </div>


      <Text>
        <form
          onSubmit={sendMessage}
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "3px",
          }}
        >
          <input
            name="message"
            placeholder={t("message")}
            value={message}
            onChange={(e) =>
              setmessage(e.target.value)
            }
            style={{
              height: "40px",
              width: "95%",
              backgroundColor: "#e2dfe4",
              fontSize: "21px",
              color: "#1E1B4B",
            }}
          />

          <button
            className="iconsend"
            type="submit"
            style={{
              border: "none",
              background: "none",
              padding: "0",
              color: state
                ? "#e2dfe4"
                : "#1E1B4B",
            }}
          >
            <FontAwesomeIcon
              icon={faPaperPlane}
            />
          </button>
        </form>
      </Text>
    </div>
  );
}
