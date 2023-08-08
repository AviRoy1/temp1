import { Fragment, useEffect, useState } from "react";
import React from "react";
import { Box, Center, Flex, Image, useMediaQuery } from "@chakra-ui/react";
import { motion } from "framer-motion";
import FooterThree from "../component/layout/footerthree";
import HeaderTwo from "../component/layout/headertwo";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import Loader from "../component/Loader/Loader";
import { useLocation } from "react-router";
//AiTwotoneFire

const UserProfile = ({ user }) => {
  // const { user } = useSelector((state) => state.user);

  const [isLaptop] = useMediaQuery("(min-width: 1024px)");
  console.log(user);

  return (
    <Fragment>
      <HeaderTwo />
      <div title={"Profile"} curPage={"Member Single"} />
      <div className="info" style={{ marginLeft: "80px" }}>
        <div className="info-card mb-4">
          <div className="info-card-title">
            <h6>Profile Picture</h6>
          </div>
          <div className="info-card-content">
            <img
              src={user.user.profilePic}
              alt="datting thumb"
              style={{ width: "300px", height: "350px" }}
            />
          </div>
          <div className="info-card-title">
            <h6>Base Info</h6>
          </div>
          <div className="info-card-content">
            <ul className="info-list">
              <li>
                <p className="info-name">Name</p>
                <p className="info-details">{user.user?.name}</p>
              </li>
              <li>
                <p className="info-name">I'm a</p>
                <p className="info-details">{user.user.gender}</p>
              </li>
              <li>
                <p className="info-name">Loking for a</p>
                <p className="info-details">{user.user.interestIn}</p>
              </li>
              <li>
                <p className="info-name">Marital Status</p>
                <p className="info-details">{user.user.relationshipStatus}</p>
              </li>
              <li>
                <p className="info-name">Age</p>
                <p className="info-details">{user.user.age}</p>
              </li>
              {/* <li>
                                <p className="info-name">Date of Birth</p>
                                <p className="info-details">27-02-1996</p>
                              </li> */}
              {/* <li>
                <p className="info-name">Address</p>
                <p className="info-details">
                  Streop Rd, Peosur, Inphodux, USA.
                </p>
              </li> */}
            </ul>
          </div>
        </div>
        <div className="info-card mb-4">
          <div className="info-card-title">
            <h6>Myself Summary</h6>
          </div>
          <div className="info-card-content">
            <p>{user.user.bio}</p>
          </div>
        </div>

        <div className="info-card mb-4">
          <div className="info-card-title">
            <h6>Looking For</h6>
          </div>
          <div className="info-card-content">
            <ul className="info-list">
              <li>
                <p className="info-name">I'm looking for </p>
                <p className="info-details">{user.user.relationshipType}</p>
              </li>
              <li>
                <p className="info-name">Whatever I like</p>
                <p className="info-details">I like to travel a lot</p>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <FooterThree />
    </Fragment>
  );
};

export default UserProfile;
