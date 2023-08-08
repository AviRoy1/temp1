import React, { useEffect, useRef, useState } from "react";
import { Box, Center, Flex, Image, useMediaQuery } from "@chakra-ui/react";
import { motion, wrap } from "framer-motion";
import TinderCard from "react-tinder-card";
import "./TinderCard.css";
import "./SwipeButtons.css";
import VisibilityRoundedIcon from "@mui/icons-material/VisibilityRounded";
import CloseIcon from "@mui/icons-material/Close";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FlashOnIcon from "@mui/icons-material/FlashOn";
import IconButton from "@mui/material/IconButton";
import ReplyIcon from "@mui/icons-material/Reply";
import { useSelector } from "react-redux";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import UserProfile from "../UserProfile";
import Loader from "../../component/Loader/Loader";
import MatchPopup from "./MatchPopup";
import ProfilePopup from "./ProfilePopup";
import { server } from "../../redux/store";
import { useSpring, animated } from "@react-spring/web";
import { useDrag } from "@use-gesture/react";
import "./SuperLike.css";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { FaCheckCircle } from "react-icons/fa";
import { Notify } from "notiflix/build/notiflix-notify-aio";
import SubscriptionPopup from "./SubscriptionPopup";
import { useNavigate } from "react-router";

const Match1 = () => {
  const [isLaptop] = useMediaQuery("(min-width: 1024px)");
  const { accessToken, isFetching, user } = useSelector((state) => state.user);
  const [loading, setLoading] = useState(true);

  const cardWidth = isLaptop ? "70vw" : "100vw";
  const MotionButton = motion.button;
  const [isMatch, setIsMatch] = useState(false);
  const [isProfilePopupOpen, setProfilePopupOpen] = useState(false);
  const [lastswap, setLastswap] = useState("");
  const [lastswapaction, setLastswapaction] = useState("none");
  const [matchusers, setMatchusers] = useState([]);
  const [curuser, setCuruser] = useState({});

  const [border, setBorder] = useState("");

  const getuser = async () => {
    try {
      const res = await axios.post(
        `${server}/api/match/create`,
        {},
        {
          headers: {
            token: accessToken,
          },
        }
      );
      setMatchusers(res.data.alluser);
      setCuruser(res.data.alluser[0]);
      console.log(
        res.data.alluser[0].name,
        res.data.alluser[0].subscription.plan
      );
      // if (res.data.alluser[0].subscription.plan === "1") {
      //   setBorder("#daa520");
      // } else if (res.data.alluser[0].subscription.plan === "2") {
      //   setBorder("#C0C0C0");
      // } else if (res.data.alluser[0].subscription.plan === "3") {
      //   setBorder("#b1757a");
      // }
      setLoading(false);
    } catch (error) {
      // Handle the error
    }
  };
  const [showpopup, setPopup] = useState(false);
  const navigate = useNavigate();
  const handleToastButtonClick = () => {
    navigate("/membership");
  };
  const likehandler = async () => {
    try {
      setLastswap(matchusers[0]._id);
      setLastswapaction("dislike");
      const rr = await await axios.post(
        `${server}/api/match/like`,
        { userid: matchusers[0]._id },
        {
          headers: {
            token: accessToken,
          },
        }
      );
      if (rr.data.ismatch) {
        setIsMatch(true);
      }
      setLastswap(matchusers[0]._id);
      Notify.success(`You liked ${matchusers[0].name}`);
      setLastswapaction("like");
      getuser();
    } catch (error) {
      toast.dismiss();
      setPopup(true);
      console.error("API Error:", error);
      toast.error(
        <>
          {error.response.data.message}
          <button onClick={handleToastButtonClick}>Buy Membership</button>
        </>
      );
    }
  };

  const handleOpenProfile = () => {
    setProfilePopupOpen(true);
  };

  const handleCloseProfile = () => {
    setProfilePopupOpen(false);
  };
  const dislikehandler = async () => {
    try {
      setLastswap(matchusers[0]._id);
      setLastswapaction("dislike");
      const rr = await axios.post(
        `${server}/api/match/dislike`,
        { userid: matchusers[0]._id },
        {
          headers: {
            token: accessToken,
          },
        }
      );
      console.log(rr.data);
      setLastswap(matchusers[0]._id);
      setLastswapaction("dislike");
      Notify.failure(`You disliked ${matchusers[0].name}`);
      getuser();
    } catch (error) {
      toast.dismiss();
      console.error("API Error:", error);
      toast.error(error.response.data.message);
    }
  };

  const onSwipe = async (dir) => {
    console.log("dir");
    if (dir === "right") {
      try {
        setLastswap(matchusers[0]._id);
        setLastswapaction("like");
        const rr = await axios.post(
          `${server}/api/match/like`,
          { userid: matchusers[0]._id },
          {
            headers: {
              token: accessToken,
            },
          }
        );
        console.log(rr.data);
        if (rr.data.ismatch) {
          setIsMatch(true);
        }
        getuser();
      } catch (error) {
        toast.dismiss();
        console.error("API Error:", error);
        toast.error(error.response.message);
      }
    } else {
      try {
        setLastswap(matchusers[0]._id);
        setLastswapaction("dislike");
        const rr = await await axios.post(
          `${server}/api/match/dislike`,
          { userid: matchusers[0]._id },
          {
            headers: {
              token: accessToken,
            },
          }
        );
        console.log(rr.data);
        getuser();
      } catch (error) {
        toast.dismiss();
        console.error("API Error:", error);
        toast.error(error.response.data.message);
      }
    }
  };

  const undoHandler = async () => {
    if (lastswapaction !== "none") {
      try {
        await axios.post(
          `${server}/api/match/undoswap`,
          {
            lastswapaction: lastswapaction,
            lastswap: lastswap,
          },
          {
            headers: {
              token: accessToken,
            },
          }
        );
      } catch (error) {
        toast.dismiss();
        console.error("API Error:", error);
        toast.error(error.response.data.message);
      }
      getuser();
    }
  };
  const [showProfilePopup, setShowProfilePopup] = useState(false);
  const openprofile = () => {
    setShowProfilePopup(true);
  };

  const [isleft, setIsleft] = useState(false);
  const [isright, setIsright] = useState(false);

  const [{ x, y }, api] = useSpring(() => ({ x: 0, y: 0 }));

  const [isCardClicked, setIsCardClicked] = useState(false);
  const cardRef = useRef(null);

  const bind = useDrag(({ down, movement: [mx, my] }) => {
    if (mx < 0) {
      setIsleft(true);
    }
    if (mx >= 0 && my > 0) {
      setIsright(true);
    }
    if (mx === 0 && my === 0) {
      setIsleft(false);
      setIsright(false);
    }
    setIsCardClicked(down); // Set the state to true when the card is being held (dragged)
  });

  // Animate opacity to 0.5 when the card is being held
  const cardOpacity = useSpring({ opacity: isCardClicked ? 0.3 : 1 });
  const imageOpacity = useSpring({ opacity: isCardClicked ? 0.3 : 1 });
  const textOpacity = useSpring({ opacity: 1 });

  useEffect(() => {
    getuser();
  }, []);

  const [showAnimation, setShowAnimation] = useState(false);

  const handleClick = () => {
    setShowAnimation(true);
    likehandler();
    // Remove the animation after 2 seconds (adjust the duration as needed)
    setTimeout(() => {
      setShowAnimation(false);
    }, 4000);
  };

  return (
    <>
      {loading === true ? (
        <Loader />
      ) : (
        <>
          <div
            style={{
              marginLeft: "0px",

              alignItems: "center", // To vertically center the content inside the parent div
            }}
            className="open">
            <div
              style={{
                flex: 1,
                color: "red",
                opacity: isleft && isCardClicked ? 1 : 0,
              }}>
              <h3 style={{ color: "red" }}>Swap Left For Dislike</h3>
            </div>
            <div
              style={{
                flex: 1,
                marginLeft: "90px",
                color: "red",
                opacity: !isleft && isCardClicked ? 1 : 0,
              }}>
              <h3 style={{ color: "green" }}>Swap Right For Like</h3>
            </div>
          </div>

          <div>
            <animated.div style={cardOpacity}>
              <Center bg="none" color="white">
                <animated.div {...bind()} style={{ x, y }}>
                  <div>
                    <Box
                      bg="none"
                      color="none"
                      height={"500px"}
                      width={cardWidth}>
                      <Flex
                        flexWrap={wrap}
                        justifyContent="center"
                        height={"100%"}
                        width={"100%"}>
                        <TinderCard
                          className="swipe"
                          onSwipe={onSwipe}
                          key={matchusers[0].name}
                          preventSwipe={["up", "down"]}>
                          <animated.div
                            ref={cardRef}
                            style={{
                              height: "440px",
                              border:
                                matchusers[0].subscription.plan === "0"
                                  ? "15px solid black"
                                  : matchusers[0].subscription.plan === "2"
                                  ? "15px solid #daa520"
                                  : matchusers[0].subscription.plan === "1"
                                  ? "15px solid #C0C0C0"
                                  : "15px solid #b1757a",
                              // borderColor: "#000001",
                              borderRadius: "70px",
                              backgroundImage: `url(${
                                matchusers[0]?.profilePic
                                  ? matchusers[0]?.profilePic
                                  : ""
                              })`,
                              ...imageOpacity, // Apply image opacity animation
                              position: "relative",
                            }}
                            className="cardd">
                            {/* The name and location text */}
                            <animated.h3
                              style={{
                                marginBottom: "30px",
                                ...textOpacity,
                                fontSize: "18px",
                                backgroundColor: "black",
                              }}>
                              {matchusers[0].name}
                              {user.subscription.plan === "2" ? (
                                <FaCheckCircle
                                  size={25}
                                  color="rgb(77, 121, 255)"
                                  style={{
                                    marginLeft: "15px",
                                  }}
                                />
                              ) : user.subscription.plan === "3" ? (
                                <FaCheckCircle
                                  size={25}
                                  color="rgb(0, 64, 255)"
                                  style={{
                                    marginLeft: "15px",
                                  }}
                                />
                              ) : (
                                ""
                              )}{" "}
                              <LocationOnIcon /> {matchusers[0].location}
                            </animated.h3>
                          </animated.div>
                        </TinderCard>
                      </Flex>
                    </Box>
                  </div>
                </animated.div>
              </Center>
            </animated.div>
            <div
              className="swipeButtons"
              style={{
                display: "flex",
                justifyContent: "space-between",
                gap: "10px",
              }}>
              <IconButton
                className="swipeButtons__repeat"
                onClick={undoHandler}>
                <ReplyIcon fontSize="large" />
              </IconButton>
              <IconButton
                className="swipeButtons__star"
                onClick={handleOpenProfile}>
                <VisibilityRoundedIcon fontSize="large" />
              </IconButton>

              <IconButton
                className="swipeButtons__left"
                onClick={dislikehandler}>
                <CloseIcon fontSize="large" />
              </IconButton>

              <IconButton className="swipeButtons__right" onClick={likehandler}>
                <FavoriteIcon fontSize="large" />
              </IconButton>

              <IconButton
                className="swipeButtons__lightning"
                onClick={handleClick}>
                <FlashOnIcon fontSize="large" />
              </IconButton>

              {showAnimation && (
                <div className="full-screen-animation">
                  {" "}
                  <img
                    src="https://i.gifer.com/Vg6.gif"
                    alt="Your Image"
                    className="animation-image"
                  />
                </div>
              )}
              {showProfilePopup && (
                <ProfilePopup
                  user={matchusers[0]}
                  onClose={setProfilePopupOpen(false)}
                />
              )}
            </div>
            {isProfilePopupOpen && (
              <ProfilePopup user={matchusers[0]} onClose={handleCloseProfile} />
            )}
            {/* {showpopup && <SubscriptionPopup onClose={() => setPopup(false)} />} */}
            {isMatch && <MatchPopup onClose={() => setIsMatch(false)} />}
            <ToastContainer
              position="top-center"
              autoClose={5000}
              hideProgressBar
            />
          </div>
        </>
      )}
    </>
  );
};

export default Match1;
