import { Component } from "react";
import { Link } from "react-router-dom";
import { useMediaQuery } from "react-responsive";

// const isSmallScreen = useMediaQuery({ maxWidth: 767 });
const title = "New Places, Unforgettable Dating.";
const desc =
  "Join our international family today! Please call us for more info.";
const btnText = "Get A Membership";

const imgLink = "http://ollya.codexcoder.com/assets/images/banner/02.png";
const imgLink1 =
  "http://ollya.codexcoder.com/assets/images/banner/shape/home2/01.png";
const imgLink2 =
  "http://ollya.codexcoder.com/assets/images/banner/shape/home2/02.png";
const imgLink3 =
  "	http://ollya.codexcoder.com/assets/images/banner/shape/home2/03.png";
const imgAlt = "Dating Thumb";

const BannerTwo = () => {
  let isSmallScreen = useMediaQuery({ maxWidth: 767 });

  return (
    <div
      className="banner banner--style2 padding-top bg_img"
      style={{
        backgroundImage:
          "url(http://ollya.codexcoder.com/assets/images/banner/bg-2.jpg)",
      }}
    >
      <div className="container">
        <div className="banner__wrapper">
          <div className="row g-0 justify-content-center">
            <div className="col-lg-4 col-12">
              <div
                className="banner__content wow fadeInLeft"
                data-wow-duration="1.5s"
              >
                <div className="banner__title">
                  <h2>{title}</h2>
                  <p>{desc}</p>
                  <Link
                    to={isSmallScreen ? "/signup" : "/membership"}
                    className="default-btn style-2"
                  >
                    <span>{isSmallScreen ? "Sign Up" : btnText}</span>
                  </Link>
                </div>
              </div>
            </div>
            <div className="col-lg-8 col-12">
              <div
                className="banner__thumb wow fadeInUp"
                data-wow-duration="1.5s"
              >
                <img src={imgLink} alt={imgAlt} />
                <div className="banner__thumb--shape">
                  <div className="shapeimg shapeimg__one">
                    <img src={imgLink1} alt="dating thumb" />
                  </div>
                  <div className="shapeimg shapeimg__two">
                    <img src={imgLink2} alt="dating thumb" />
                  </div>
                  <div className="shapeimg shapeimg__three">
                    <img src={imgLink3} alt="dating thumb" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BannerTwo;
