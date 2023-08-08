import { Fragment, useEffect, useState } from "react";
import React from "react";
import { Box, Center, Flex, Image, useMediaQuery } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { toast, ToastContainer } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import Footer from "../component/layout/footer";
import HeaderTwo from "../component/layout/headertwo";
import PageHeader from "../component/layout/pageheader";
import { useDispatch, useSelector } from "react-redux";
import { matchuser } from "../redux/actions/matchAction";
import axios from "axios";
import Loader from "../component/Loader/Loader";
import MatchPopup from "./Match/MatchPopup";
import UserProfile from "./UserProfile";
import "./toast.css";
import ProfilePopup from "./Match/ProfilePopup";
import ProfilePage from "./Profile/ProfilePage";
import Match1 from "./Match/Match1";
import SwipeButtons from "./Match/SwipeButtons";
import { Notify } from "notiflix/build/notiflix-notify-aio";

const MemberDetails = () => {
  const { user, accessToken, isVerified, message } = useSelector(
    (state) => state.user
  );
  // console.log(user);
  const [isLaptop] = useMediaQuery("(min-width: 1024px)");
  const [loading, setLoading] = useState(false);
  const nevigate = useNavigate();

  return (
    <Fragment>
      <HeaderTwo />
      {loading === true ? (
        <Loader />
      ) : (
        <>
          <div title={"Member Single Page"} curPage={"Member Single"} />
          <div className="group group--single padding-bottom">
            {/* <div className="group__top" style={{ marginLeft: "20px" }}>
              <div className="container">
                <div className="row" style={{ marginLeft: "210px" }}>
                  <div className="col-xl-3 d-none d-xl-block"></div>
                  <div className="col-xl-9">
                    <ul className="nav nav-tabs" id="myTab" role="tablist">
                      <li className="nav-item" role="presentation">
                        <button
                          className="nav-link active"
                          id="gt1-tab"
                          data-bs-toggle="tab"
                          data-bs-target="#gt1"
                          type="button"
                          role="tab"
                          aria-controls="gt1"
                          aria-selected="true">
                          <i className="fa-solid fa-house"></i> Activity
                        </button>
                      </li>
                      <li className="nav-item" role="presentation">
                        <button
                          className="nav-link"
                          id="gt2-tab"
                          data-bs-toggle="tab"
                          data-bs-target="#gt2"
                          type="button"
                          role="tab"
                          aria-controls="gt2"
                          aria-selected="false">
                          <i className="fa-solid fa-users"></i> Profile{" "}
                        </button>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div> */}
            <div className="group__bottom">
              <div className="container">
                <div className="row g-4">
                  <div className="col-xl-6 order-xl-1">
                    <div className="group__bottom--left">
                      <div className="tab-content" id="myTabContent">
                        <div
                          className="tab-pane fade show active"
                          id="gt1"
                          role="tabpanel"
                          aria-labelledby="gt1-tab">
                          <div
                            className="group__bottom--area group__bottom--memberactivity"
                            style={{ backgroundColor: "none", color: "black" }}>
                            {/* {matchusers.length === 0 ? (
                              <>
                                <div>
                                  <h1>NO user found</h1>
                                </div>
                              </>
                            ) : ( */}
                            <>
                              <Match1 user={user} />
                            </>
                            {/* )
                            } */}
                          </div>
                        </div>

                        {/* <div
                          className="tab-pane fade"
                          id="gt2"
                          role="tabpanel"
                          aria-labelledby="gt2-tab">
                          <ProfilePage />
                        </div> */}
                      </div>
                    </div>
                  </div>
                  <div className="col-xl-3 order-xl-0">
                    <div className="group__bottom--center"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
      <Footer />
      <ToastContainer position="top-center" autoClose={5000} hideProgressBar />
    </Fragment>
  );
};

export default MemberDetails;
