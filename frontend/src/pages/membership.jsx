import { React, Fragment, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import FooterThree from "../component/layout/footerthree";
import HeaderTwo from "../component/layout/headertwo";
import PageHeader from "../component/layout/pageheader";
import Footer from "../component/layout/footer";
import MembershipTable from "../component/layout/MembershipTable";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import BackToTop from "../component/layout/BackToTop";
const title = "Membership Levels";
const subtitle =
  "Our dating platform is like a breath of fresh air. Clean and trendy design with ready to use features we are sure you will love.";

const MembershipPage = () => {
  const { user, accessToken } = useSelector((state) => state.user);
  const navigate = useNavigate();

  const [plan, setPlan] = useState("0");

  async function clicked() {
    console.log(plan);
    try {
      console.log(JSON.stringify(plan));
      const res = await axios.post(
        "http://localhost:5000/api/payment/subscribe",
        { plan: plan },
        {
          headers: {
            "Content-Type": "application/JSON",
            token: accessToken,
          },
          withCredentials: true,
        }
      );
      const url = res.data.subscription.short_url;
      window.location.href = url;
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <Fragment>
      <HeaderTwo />
      {/* <PageHeader title={"Membership Levels"} curPage={"Membership"} /> */}
      <div className="membership padding-top padding-bottom">
        <div className="container">
          <div className="section__header style-2 text-center">
            <h2>{title}</h2>
            <p>{subtitle}</p>
          </div>
          <div className="section__wrapper">
            <div className="row g-4 justify-content-center row-cols-xl-4 row-cols-lg-3 row-cols-sm-2 row-cols-1">
              {/* Silver Plan */}
              <div className="col">
                <div className="membership__item">
                  <div className="membership__inner">
                    <div className="membership__head">
                      <div
                        style={{ backgroundColor: "rgba(106, 108, 130, 0.7)" }}>
                        <h4 style={{ color: "white" }}>Silver</h4>
                      </div>

                      <p
                        style={{
                          minHeight: "100px",
                          backgroundColor: "#f9f9f9",
                        }}>
                        ₹99 for a week
                      </p>
                    </div>
                    <div className="membership__body">
                      <h4
                        style={{
                          color: "#6a6c82",
                          borderTop: "1px solid rgba(33, 51, 102, 0.1)",
                        }}>
                        ₹99
                      </h4>
                      <ul>
                        <li>
                          <span>
                            {" "}
                            <i
                              class="bi bi-circle-fill"
                              style={{
                                color: "rgba(190, 194, 203, 0.7)",
                                marginRight: "10px",
                              }}></i>{" "}
                            Weekly 1 superlike
                          </span>
                        </li>
                        <li>
                          <span>
                            {" "}
                            <i
                              class="bi bi-circle-fill"
                              style={{
                                color: "rgba(190, 194, 203, 0.7)",
                                marginRight: "10px",
                              }}></i>{" "}
                            50 swipes per day
                          </span>
                        </li>
                        <li>
                          <span>
                            <i
                              class="bi bi-circle-fill"
                              style={{
                                color: "rgba(190, 194, 203, 0.7)",
                                marginRight: "10px",
                              }}></i>{" "}
                            25 messages each (total{" "}
                            <span> &nbsp; &nbsp; &nbsp; &nbsp;</span>
                            50)
                          </span>
                        </li>
                        <li>
                          <span>
                            {" "}
                            <i
                              class="bi bi-circle-fill"
                              style={{
                                color: "rgba(190, 194, 203, 0.7)",
                                marginRight: "10px",
                              }}></i>{" "}
                            No Blue Tick
                          </span>
                        </li>
                      </ul>
                    </div>
                    <div className="membership__footer">
                      <button
                        className="default-btn silverButton reverse"
                        color="black"
                        onClick={(e) => {
                          setPlan("1");
                          clicked();
                        }}>
                        <span> Select Plan</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Gold Plan */}
              <div className="col">
                <div className="membership__item">
                  <div
                    className="membership__inner"
                    style={{
                      border: "2px solid rgba(212, 175, 55, 1)",
                      borderRadius: "1px",
                    }}>
                    <div className="membership__head">
                      <div style={{ backgroundColor: "rgba(212, 175, 55, 1)" }}>
                        {" "}
                        <h4>Gold</h4>
                      </div>

                      <p
                        style={{
                          minHeight: "100px",
                          backgroundColor: "#f9f9f9",
                        }}>
                        ₹299 for 30 days
                      </p>
                    </div>
                    <div className="membership__body">
                      <h4
                        style={{
                          color: "rgba(212, 175, 55, 1)",
                          borderTop: "1px solid rgba(33, 51, 102, 0.1)",
                        }}>
                        ₹299
                      </h4>
                      <ul>
                        <li>
                          <span>
                            <i
                              class="bi bi-circle-fill"
                              style={{
                                color: "rgba(212, 175, 55, 1)",
                                marginRight: "10px",
                              }}></i>{" "}
                            Weekly 2 superlike
                          </span>
                        </li>
                        <li>
                          <span>
                            <i
                              class="bi bi-circle-fill"
                              style={{
                                color: "rgba(212, 175, 55, 1)",
                                marginRight: "10px",
                              }}></i>{" "}
                            100 swipes per day
                          </span>
                        </li>
                        <li>
                          <span>
                            <i
                              class="bi bi-circle-fill"
                              style={{
                                color: "rgba(212, 175, 55, 1)",
                                marginRight: "10px",
                              }}></i>{" "}
                            100 messages each
                            <span>
                              {" "}
                              &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                              &nbsp;
                            </span>
                            (total 200)
                          </span>
                        </li>
                        <li>
                          <span>
                            <i
                              class="bi bi-circle-fill"
                              style={{
                                color: "rgba(212, 175, 55, 1)",
                                marginRight: "10px",
                              }}></i>{" "}
                            Blue Tick
                          </span>
                        </li>
                      </ul>
                    </div>
                    <div className="membership__footer">
                      <button
                        className="goldButton default-btn reverse"
                        color="black"
                        onClick={(e) => {
                          setPlan("2");
                          clicked();
                        }}>
                        <span> Select Plan</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Platinum Plan */}
              <div className="col">
                <div className="membership__item">
                  <div
                    className="membership__inner"
                    style={{
                      border: "2px solid black",
                      boxShadow: "0 0 15px 4px #1565c0",
                    }}>
                    <div className="membership__head css-selector">
                      <div
                      // style={{
                      //   background:
                      //     "linear-gradient(to right, #b92b27, #1565c0)",
                      // }}
                      >
                        <h4 style={{ color: "white" }}>Platinum</h4>
                      </div>

                      <p
                        style={{
                          minHeight: "100px",
                          backgroundColor: "#f9f9f9",
                        }}>
                        ₹999 for 6 months
                      </p>
                    </div>
                    <div className="membership__body">
                      <h4
                        style={{
                          color: "#213366",
                          borderTop: "1px solid rgba(33, 51, 102, 0.1)",
                        }}>
                        ₹999
                      </h4>
                      <ul>
                        <li>
                          <span>
                            <i
                              class="bi bi-circle-fill"
                              style={{
                                color: "#213366",
                                marginRight: "10px",
                              }}></i>{" "}
                            Daily 1 superlike
                          </span>
                        </li>
                        <li>
                          <span>
                            {" "}
                            <i
                              class="bi bi-circle-fill"
                              style={{
                                color: "#213366",
                                marginRight: "10px",
                              }}></i>
                            unlimited swipes per day
                          </span>
                        </li>
                        <li>
                          <span>
                            <i
                              class="bi bi-circle-fill"
                              style={{
                                color: "#213366",
                                marginRight: "10px",
                              }}></i>{" "}
                            unlimited messages{" "}
                            <span>
                              {" "}
                              &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                              &nbsp; &nbsp; &nbsp;
                            </span>
                          </span>
                        </li>
                        <li>
                          <span>
                            {" "}
                            <i
                              class="bi bi-circle-fill"
                              style={{
                                color: "#213366",
                                marginRight: "10px",
                              }}></i>{" "}
                            Blue Tick
                          </span>
                        </li>
                      </ul>
                    </div>
                    <div className="membership__footer">
                      <button
                        className="default-btn reverse"
                        color="black"
                        onClick={(e) => {
                          setPlan("3");
                          clicked();
                        }}>
                        <span> Select Plan</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div
              className="row g-4 justify-content-center row-cols-xl-4 row-cols-lg-3 row-cols-sm-2 row-cols-1"
              style={{ marginTop: "10px" }}>
              {/* Bronze Plan */}
              <div className="col">
                <div className="membership__item">
                  <div className="membership__inner" style={{}}>
                    <div className="membership__head">
                      <div
                        style={{
                          backgroundColor: "rgba(190, 85, 4, 0.5)",
                        }}>
                        <h4 style={{ color: "white" }}>Free Tier</h4>
                      </div>

                      <p
                        style={{
                          minHeight: "100px",
                          backgroundColor: "#f9f9f9",
                        }}>
                        No payment, Free Forever
                      </p>
                    </div>
                    <div className="membership__body">
                      <h4
                        style={{
                          color: "rgba(190, 85, 4, 0.5)",
                          borderTop: "1px solid rgba(33, 51, 102, 0.1)",
                        }}>
                        Free
                      </h4>
                      <ul>
                        <li>
                          <span>
                            <i
                              class="bi bi-circle-fill"
                              style={{
                                color: "rgba(190, 85, 4, 0.5)",
                                marginRight: "10px",
                              }}></i>
                            Weekly 1 superlike
                          </span>
                        </li>
                        <li>
                          <span>
                            <i
                              class="bi bi-circle-fill"
                              style={{
                                color: "rgba(190, 85, 4, 0.5)",
                                marginRight: "10px",
                              }}></i>{" "}
                            30 swipes per day
                          </span>
                        </li>
                        <li>
                          <span>
                            <i
                              class="bi bi-circle-fill"
                              style={{
                                color: "rgba(190, 85, 4, 0.5)",
                                marginRight: "10px",
                              }}></i>{" "}
                            5 messages each (total
                            <span>
                              {" "}
                              &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                            </span>
                            10)
                          </span>
                        </li>
                        <li>
                          <span>
                            <i
                              class="bi bi-circle-fill"
                              style={{
                                color: "rgba(190, 85, 4, 0.5)",
                                marginRight: "10px",
                              }}></i>{" "}
                            No Blue Tick
                          </span>
                        </li>
                      </ul>
                    </div>
                    <div className="membership__footer">
                      <button
                        className="bronzeButton default-btn reverse"
                        color="black"
                        onClick={(e) => {
                          setPlan("0");
                          console.log("click");
                          clicked();
                        }}>
                        <span> Select Plan</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* super saver */}

              <div className="col">
                <div className="membership__item">
                  <div className="membership__inner" style={{}}>
                    <div className="membership__head">
                      <div
                        style={{
                          backgroundColor: "#009193",
                        }}>
                        <h4 style={{ color: "white" }}>super Value</h4>
                      </div>

                      <p
                        style={{
                          minHeight: "100px",
                          backgroundColor: "#f9f9f9",
                        }}>
                        ₹19 for 1 day
                      </p>
                    </div>
                    <div className="membership__body">
                      <h4
                        style={{
                          color: "#009193",
                          borderTop: "1px solid rgba(33, 51, 102, 0.1)",
                        }}>
                        ₹19
                      </h4>
                      <ul>
                        <li>
                          <span>
                            <i
                              class="bi bi-circle-fill"
                              style={{
                                color: "#009193",
                                marginRight: "10px",
                              }}></i>
                            1 superlike per day
                          </span>
                        </li>
                        <li>
                          <span>
                            <i
                              class="bi bi-circle-fill"
                              style={{
                                color: "#009193",
                                marginRight: "10px",
                              }}></i>{" "}
                            50 swipes per day
                          </span>
                        </li>
                        <li>
                          <span>
                            <i
                              class="bi bi-circle-fill"
                              style={{
                                color: "#009193",
                                marginRight: "10px",
                              }}></i>{" "}
                            25 messages each (total{" "}
                            <span> &nbsp; &nbsp; &nbsp; &nbsp;</span>
                            50)
                          </span>
                        </li>
                        <li>
                          <span>
                            <i
                              class="bi bi-circle-fill"
                              style={{
                                color: "#009193",
                                marginRight: "10px",
                              }}></i>{" "}
                            No Blue Tick
                          </span>
                        </li>
                      </ul>
                    </div>
                    <div className="membership__footer">
                      <button
                        className="superbutton default-btn reverse"
                        color="black"
                        onClick={(e) => {
                          setPlan("0");
                          console.log("click");
                          clicked();
                        }}>
                        <span> Select Plan</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <MembershipTable />
      <Footer />
      <BackToTop />
    </Fragment>
  );
};

export default MembershipPage;
