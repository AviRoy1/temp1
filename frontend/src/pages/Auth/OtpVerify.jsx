import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../../redux/actions/userAction";
import { useNavigate, useLocation } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import { useSelector } from "react-redux";
import { resendOtp, verifyOtp } from "../../apis/OtpVerify";
import { optVerify } from "../../redux/actions/userAction";
import { toast, ToastContainer } from "react-toastify";
import { signup } from "../../redux/actions/userAction";
import "react-toastify/dist/ReactToastify.css";
const title = "Please Verify Your Email";
const otherTitle = "Sign up with your email";
const OtpVerify = () => {
  const { user } = useSelector((state) => state.user);
  const [otp, setOtp] = useState("");
  const [clicked, setClicked] = useState(0);
  let isSmallScreen = useMediaQuery({ maxWidth: 767 });
  const isVerified = useSelector((state) => state.user.isVerified);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { email, name, password, age, gender, preference } = location.state;
  console.log(email, name, password, age, gender, preference);
  const useHandler = async (e) => {
    e.preventDefault();
    if (otp !== "") {
      try {
        optVerify(dispatch, {
          email: email,
          otp: otp,
        });
        setClicked(clicked + 1);
      } catch (error) {
        console.log(error);
      }
    } else {
      toast.error("otp cannot be empty");
    }
  };
  useEffect(() => {
    console.log(isVerified);

    if (isVerified === "VERIFIED" || isVerified === "pending") {
      toast.success("email account verified");
      signup(dispatch, { email, name, password });
      //navigate("/addprofile");
      navigate("/addprofile", {
        state: {
          SelectedAge: age,
          SelectedGender: gender,
          preference,
        },
      });
    }
    if (isVerified === "invalid") {
      toast.error("otp is invalid, check your inbox");
    }
  }, [isVerified, clicked]);
  const handleResend = async (e) => {
    e.preventDefault();
    const AuthData = {
      email: email,
    };
    try {
      const { data } = await resendOtp(AuthData);
      if (data && data.message) {
        toast.success(`${data.message}`);
      }
    } catch (error) {
      console.log(error);
    }
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
              }}>
              <div
                className="section-header inloginp"
                style={{ marginRight: isSmallScreen ? "-20px" : "0" }}>
                <h2 className="title">{title}</h2>
              </div>
              <div
                className="main-content inloginp"
                style={{ marginRight: isSmallScreen ? "-20px" : "0" }}>
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
                        setOtp(e.target.value);
                      }}
                      placeholder="Enter your OTP"
                      className="my-form-control"
                    />
                  </div>
                  <div className="text-center">
                    <button
                      type="submit"
                      className="default-btn"
                      onClick={useHandler}>
                      <span>Confirm</span>
                    </button>
                  </div>
                  <div className="or">
                    <p>OR</p>
                  </div>
                  <div className="or-content">
                    {/* <p>{otherTitle}</p>
                                            <a href="#" className="default-btn reverse"><img src="assets/images/login/google.png" alt="google" /> <span>Sign Up with Google</span></a> */}
                    <p className="or-signup">
                      {" "}
                      Didn't receive your OTP?{" "}
                      <Link onClick={handleResend}>&nbsp;Resend</Link>
                    </p>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer position="top-center" autoClose={2000} hideProgressBar />
    </section>
  );
};
export default OtpVerify;
