import React, { useEffect, useState } from "react";
import { getDetails } from "../../apis/ChatRequest";
import img1 from "../../css/assets/images/member/male/04.jpg";
import green from "../../css/assets/images/logo/green.png";
import grey from "../../css/assets/images/logo/grey.png";
import { getLatestMessage } from "../../apis/MessageRequest";
import { format } from "timeago.js";
import axios from "axios";
import { server } from "../../redux/store";

const imageUrl =
  "https://cdn.vox-cdn.com/thumbor/S7APkbn99b1oVsds_1JBhvdzsWU=/0x0:2000x1000/1400x1400/filters:focal(814x298:815x299)/cdn.vox-cdn.com/uploads/chorus_asset/file/10440907/Thanos_MCU.jpg";

const ChatContact = ({
  data,
  currentUser,
  online,
  receiveMessage,
  sendMessage,
}) => {
  const [userData, setUserData] = useState(null);
  let result = data.messageCount > data.totalMessage;
  const [limitOver, setLimitOver] = useState(result);

  useEffect(() => {
    const userId = data.members.find((id) => id !== currentUser);
    const getUser = async () => {
      try {
        const { data } = await axios.post(`${server}/api/chat/detail`, {
          userId: userId,
        });
        setUserData(data);
      } catch (err) {
        console.log(err);
      }
    };
    getUser();
  }, []);

  const [displayData, setDisplayData] = useState(null);
  useEffect(() => {
    const fetchDisplayData = async () => {
      let Ddata;

      try {
        Ddata = await getLatestMessage(data._id);
        setDisplayData(Ddata.data);
      } catch (err) {
        console.log(err);
      }
    };
    if (data) fetchDisplayData();
  }, [receiveMessage, sendMessage]);
  return (
    <li className="p-2 border-bottom">
      <a href="#!" className="d-flex justify-content-between">
        <div className="d-flex flex-row">
          <div>
            <img
              src={userData?.profilePic ? userData.profilePic : img1}
              alt="avatar"
              className="d-flex align-self-center me-3"
              style={{ borderRadius: "100%", height: "50px", width: "50px" }}
            />
          </div>
          <div className="pt-1">
            <p className="fw-bold mb-0">
              {userData ? userData.name : ""}
              <img
                src={online ? green : grey}
                alt={"status"}
                height={10}
                width={10}
                style={{ marginLeft: "5px" }}
              />
            </p>
            <p className="small text-muted">
              <p className="small text-muted">
                {!limitOver
                  ? displayData?.text
                    ? displayData.text
                    : ""
                  : "Message Limit is over!🔒"}
              </p>
            </p>
          </div>
        </div>
        <div className="pt-1">
          <p className="small text-muted mb-1">
            {" "}
            {displayData?.createdAt ? format(displayData.createdAt) : ""}
          </p>
        </div>
      </a>
    </li>
  );
};

export default ChatContact;
