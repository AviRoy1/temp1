import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../redux/actions/userAction";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

const title = "Welcome to Ollya";
const otherTitle = "Sign up with your email";

const Login = () => {
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
              <div className="section-header inloginp">
                <h2 className="title">{title}</h2>
              </div>
              <div className="main-content inloginp">
                <form action="#">
                  <div className="form-group">
                    <label>Email</label>
                    <input
                      type="email"
                      name="email"
                      id="item01"
                      //   value={this.state.userEmail}
                      onChange={(e) => {
                        setEmail(e.target.value);
                      }}
                      placeholder="Enter Your Email *"
                      className="my-form-control"
                    />
                  </div>
                  <div className="form-group">
                    <label>Password</label>
                    <input
                      type="password"
                      name="password"
                      id="item02"
                      //   value={this.state.userPass}
                      onChange={(e) => {
                        setPassword(e.target.value);
                      }}
                      placeholder="Enter Your Password *"
                      className="my-form-control"
                    />
                  </div>
                  <p className="f-pass">
                    Forgot your password? <a href="#">recover password</a>
                  </p>
                  <div className="text-center">
                    <button
                      type="submit"
                      className="default-btn"
                      onClick={useHandler}>
                      <span>Sign IN</span>
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
                      Don't have an account?{" "}
                      <Link to="/register">Sign up here</Link>
                    </p>
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

export default Login;
