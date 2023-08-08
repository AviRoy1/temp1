import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../redux/actions/userAction";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { useMediaQuery } from "react-responsive";

const title = "Enter your new password";
const otherTitle = "Sign up with your email";

const NewPassword = () => {
  let isSmallScreen = useMediaQuery({ maxWidth: 767 });
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const nevigate = useNavigate();
  const useHandler = (e) => {
    try {
      e.preventDefault();
      login(dispatch, { email, password });
      // toast.success("Welcome Back");
      nevigate("/member-single");
    } catch (error) {
      toast.error(error.response.data.message);
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
            <div className="log-reg-inner">
              <div
                className="section-header inloginp"
                style={{ marginLeft: isSmallScreen ? "25px" : "0" }}
              >
                <h2 className="title">{title}</h2>
              </div>
              <div
                className="main-content inloginp"
                style={{ marginLeft: isSmallScreen ? "25px" : "0" }}
              >
                <form action="#">
                  <div className="form-group">
                    <label>Password</label>
                    <input
                      type="password"
                      name="password"
                      id="item01"
                      //   value={this.state.userEmail}
                      onChange={(e) => {
                        setEmail(e.target.value);
                      }}
                      placeholder="Enter Your new Password"
                      className="my-form-control"
                    />
                  </div>
                  <div className="form-group">
                    <label>Confirm Password</label>
                    <input
                      type="password"
                      name="confirmpassword"
                      id="item02"
                      //   value={this.state.userPass}
                      onChange={(e) => {
                        setPassword(e.target.value);
                      }}
                      placeholder="Confirm Your new Password"
                      className="my-form-control"
                    />
                  </div>
                  <div className="text-center">
                    <button
                      type="submit"
                      className="default-btn"
                      onClick={useHandler}
                    >
                      <span>Reset</span>
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
export default NewPassword;
