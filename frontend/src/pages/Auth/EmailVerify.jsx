import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../../redux/actions/userAction";
import { useNavigate } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import { useSelector } from "react-redux";
import { resendOtp, verifyOtp } from "../../apis/OtpVerify";
import { optVerify } from "../../redux/actions/userAction";
import { toast, ToastContainer } from "react-toastify";

const title = "Please Verify Your Email";
const otherTitle = "Sign up with your email";

const EmailVerify = () => {
  const { user } = useSelector((state) => state.user);
  const [email, setEmail] = useState("");
  let isSmallScreen = useMediaQuery({ maxWidth: 767 });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const useHandler = async (e) => {
    console.log("button clicked");
  };

  return (
    <section className="log-reg">
      <div className="top-menu-area">
        <div className="container">
          <div className="row">
            <div className="col-lg-8 col-7">
              <div className="logo">
                <Link to="/">
                  <img
                    src="http://ollya.codexcoder.com/assets/images/logo/logo.png"
                    alt="logo"
                  />
                </Link>
              </div>
            </div>
            <div className="col-lg-4 col-5">
              <Link to="/" className="backto-home">
                <i className="fas fa-chevron-left"></i> Back to Home
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="row">
          <div className="image image-log"></div>
          <div className="col-lg-7">
            <div
              className="log-reg-inner"
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                marginRight: "-10px",
              }}
            >
              <div
                className="section-header inloginp"
                style={{ marginRight: isSmallScreen ? "-20px" : "0" }}
              >
                <h2 className="title">{title}</h2>
              </div>
              <div
                className="main-content inloginp"
                style={{ marginRight: isSmallScreen ? "-20px" : "0" }}
              >
                <form action="#">
                  <div className="form-group">
                    <label></label>
                    {/* <br></br> */}
                    <input
                      type="email"
                      name="email"
                      id="item01"
                      //   value={this.state.userEmail}
                      onChange={(e) => {
                        setEmail(e.target.value);
                      }}
                      placeholder="Enter your Email"
                      className="my-form-control"
                      style={{ width: "400px" }}
                    />
                  </div>
                  <div className="text-center">
                    <button
                      type="submit"
                      className="default-btn"
                      onClick={useHandler}
                    >
                      <span>Confirm</span>
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer position="top-center" autoClose={5000} hideProgressBar />
    </section>
  );
};

export default EmailVerify;
