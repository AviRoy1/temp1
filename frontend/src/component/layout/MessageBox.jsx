import React, { useRef, useEffect, useState } from "react";
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBCardHeader,
  MDBIcon,
  MDBTypography,
  MDBInputGroup,
} from "mdb-react-ui-kit";
import { addMessage, getMessages } from "../../apis/MessageRequest";
import img1 from "../../css/assets/images/member/male/04.jpg";
import { format } from "timeago.js";
import { getDetails } from "../../apis/ChatRequest";
import axios from "axios";
import { server } from "../../redux/store";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useMediaQuery } from "react-responsive";

const MessageBox = ({
  chat,
  userData,
  // otherUserdata,
  currentUser,
  setSendMessage,
  receiveMessage,
}) => {
  const { user, accessToken } = useSelector((state) => state.user);
  // userData = user;
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [currentUserData, setCurrentUserData] = useState();
  const [isPickerVisible, setPickerVisible] = useState(true);
  const scroll = useRef();
  const [receiver, setReceiver] = useState([]);
  const isSmallScreen = useMediaQuery({ maxWidth: 981 });

  let limitOver = chat.TotalMessage < chat.messageCount;

  const handleChange = (e) => {
    setNewMessage(e.target.value);
  };

  //for fetching old message
  useEffect(() => {
    // console.log("fetching messsages");
    const fetchMessages = async () => {
      try {
        const { data } = await getMessages(chat._id);
        setMessages(data);
      } catch (error) {
        console.log(error);
      }
    };

    if (chat !== null) fetchMessages();
  }, [chat, currentUser]);

  // const getreceiver = async () => {
  //   const res = await axios.post(
  //     `${server}/api/user/getprofile`,
  //     {
  //       id: currentUser,
  //     },
  //     {
  //       headers: {
  //         token: accessToken,
  //       },
  //     }
  //   );
  //   setReceiver(res.data.user);
  // };
  // useEffect(() => {
  //   getreceiver();
  // }, []);

  //for fetching getting message from socket.io
  useEffect(() => {
    if (receiveMessage != null && receiveMessage.chatId === chat._id) {
      setMessages([...messages, receiveMessage]);
    }
  }, [receiveMessage]);

  //scroll to last message
  useEffect(() => {
    scroll.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  //get currenrUser data
  useEffect(() => {
    const getUserData = async () => {
      try {
        const { data } = await axios.post(`${server}/api/chat/detail`, {
          userId: currentUser,
        });
        setCurrentUserData(data);
      } catch (err) {
        console.log(err);
      }
    };
    getUserData();
  }, [currentUser]);

  const handelSend = async (e) => {
    e.preventDefault();

    const message = {
      senderId: currentUser,
      text: newMessage,
      chatId: chat._id,
    };

    try {
      const response = await addMessage(message);
      const { result, newChat } = response.data;
      setMessages([...messages, result]);
      setNewMessage("");
      limitOver = newChat.TotalMessage < newChat.messageCount;
    } catch (err) {
      console.log(err);
    }

    const receiverId = chat.members.find((id) => id !== currentUser);
    setSendMessage({ ...message, receiverId });
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handelSend(e);
    }
  };

  return (
    <>
      <div style={{ position: "relative" }}>
        {limitOver && (
          <div
            style={{
              position: "absolute",
              top: isSmallScreen ? "30%" : "35%",
              left: isSmallScreen ? "17%" : "40%",
              width: "225px",
              height: "150px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyItems: "center",
              backgroundColor: "#f24570",
              borderRadius: "20px",
              zIndex: 10,
            }}
            className="message__overlay"
            // className="pt-3 pe-3"
          >
            <div
              className="message__overlay_text"
              style={{
                width: "200px",
                color: "white",
                fontSize: "20px",
                fontWeight: "600",
                marginTop: "20px",
                color: "#213366",
                fontfamily: '"Public Sans", sans-serif',
              }}
            >
              Message Limit Over!
            </div>
            <Link
              to={"/membership"}
              className="default-btn style-2 message_overlay_button"
              style={{
                margin: "20px",
                cursor: "pointer",
                backgroundColor: "white",
              }}
            >
              <span style={{ color: "#f24570" }}>Upgrade now</span>
            </Link>
          </div>
        )}
        <div
          style={{
            overflowY: "auto",
            position: "relative",
            height: "67.2vh",
            zIndex: "5px",
          }}
          className="pt-3 pe-3"
        >
          {messages.map((message, index) => (
            <>
              {message.senderId === currentUser ? (
                <div
                  className="d-flex flex-row justify-content-end"
                  ref={scroll}
                >
                  <div>
                    <p
                      className="small p-2 me-3 mb-1 text-white rounded-3 bg-primary"
                      style={{
                        maxWidth: "400px",
                        width: index > chat.TotalMessage ? "120px" : "auto",
                        filter:
                          index >= chat.TotalMessage ? "blur(8px)" : "none",
                        WebkitFilter:
                          index >= chat.TotalMessage ? "blur(8px)" : "none",
                      }}
                    >
                      {index >= chat.TotalMessage ? "**********" : message.text}
                    </p>
                    <p
                      className="small me-3 mb-3 rounded-3 text-muted"
                      style={{ textAlign: "right" }}
                    >
                      {format(message.createdAt)}
                    </p>
                  </div>
                  <img
                    src={
                      currentUserData?.profilePic
                        ? currentUserData.profilePic
                        : img1
                    }
                    alt="avatar 1"
                    style={{
                      width: "45px",
                      height: "45px",
                      borderRadius: "100%",
                    }}
                  />
                </div>
              ) : (
                <div
                  className="d-flex flex-row justify-content-start"
                  style={{ overflowY: "auto" }}
                  ref={scroll}
                >
                  <img
                    src={userData?.profilePic ? userData.profilePic : img1}
                    alt="avatar 1"
                    style={{
                      width: "45px",
                      height: "45px",
                      borderRadius: "100%",
                    }}
                  />
                  <div>
                    <p
                      className="small p-2 ms-3 mb-1 rounded-3"
                      style={{
                        backgroundColor: "#f5f6f7",
                        maxWidth: "400px",
                        width: index >= chat.TotalMessage ? "120px" : "auto",
                        filter:
                          index >= chat.TotalMessage ? "blur(8px)" : "none",
                        WebkitFilter:
                          index >= chat.TotalMessage ? "blur(8px)" : "none",
                      }}
                    >
                      {index >= chat.TotalMessage ? "**********" : message.text}
                    </p>
                    <p
                      className="small ms-3 mb-3 rounded-3 text-muted float-start"
                      style={{ textAlign: "left" }}
                    >
                      {format(message.createdAt)}
                    </p>
                  </div>
                </div>
              )}
            </>
          ))}
        </div>
      </div>
      <div
        className="text-muted d-flex justify-content-start align-items-center pe-3  mt-2"
        style={{
          border: "1px solid #f24570",
          borderRadius: "10px",
        }}
      >
        <input
          type="text"
          className="form-control form-control-lg"
          id="exampleFormControlInput2"
          placeholder="Type message"
          onChange={(e) => handleChange(e)}
          value={newMessage}
          // KeyPress={handleKeyPress}
          onKeyUp={handleKeyPress}
        />
        <a className="ms-3 text-muted">
          <input type="file" id="uploadFile" style={{ display: "none" }} />
          <label htmlFor="uploadFile">
            <MDBIcon fas icon="paperclip" />
          </label>
        </a>
        <a class="ms-3" href="#!" onClick={handelSend}>
          <i class="fas fa-paper-plane"></i>
        </a>
      </div>
    </>
  );
};

export default MessageBox;
