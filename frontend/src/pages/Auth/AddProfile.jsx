import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import img1 from "../../css/assets/images/member/male/04.jpg";
import { updateProfile } from "../../redux/actions/userAction";
import { useDispatch, useSelector } from "react-redux";
import { Avatar, Box, FormLabel, Input, WrapItem } from "@chakra-ui/react";
import { toast, ToastContainer } from "react-toastify";
import { AiFillPlusCircle } from "react-icons/ai";
import app from "../firebase";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { borderRadius } from "@mui/system";

export const fileUploadCss = {
  cursor: "pointer",
  marginLeft: "-5%",
  width: "110%",
  border: "none",
  height: "100%",
  color: "#ECC94B",
  backgroundColor: "white",
};
const fileUploadStyle = {
  "&::file-selector-button": fileUploadCss,
};

const AddProfile = () => {
  const { user, isFetching, accessToken } = useSelector((state) => state.user);
  const [location, setLocation] = useState();
  const location2 = useLocation();

  const {
    SelectedAge = "",
    SelectedGender = "",
    preference = "",
  } = location2.state || {};

  console.log(SelectedAge, SelectedGender, preference);
  const [age, setAge] = useState(SelectedAge);
  const [gender, setGender] = useState(SelectedGender);
  const [interestIn, setInterestIn] = useState(preference);
  const [relationshipType, setRelationshipType] = useState("");
  const [relationshipStatus, setRelationshipStatus] = useState("");
  const [bio, setBio] = useState("");
  const [imagePrev, setImagePrev] = useState("");
  const [image, setImage] = useState("");
  const [file, setfile] = useState(null);
  const nevigate = useNavigate();

  const changeImageHandler = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.readAsDataURL(file);

    reader.onloadend = () => {
      setImagePrev(reader.result);
      setImage(file);
      setfile(file);
    };
  };
  // console.log(user);

  // console.log(location);
  const dispatch = useDispatch();
  const useHandler = (e) => {
    e.preventDefault();
    if (age == "") {
      toast.error("please fill your age!");
    } else if (gender == "") {
      toast.error("please Choose your Gender!");
    } else if (interestIn == "") {
      toast.error("please Choose your prefernece");
    } else if (relationshipStatus == "") {
      toast.error("please Choose your relationship Status");
    } else if (relationshipType == "") {
      toast.error("please Choose your relationship type");
    } else if (bio == "") {
      toast.error("please add your bio");
    } else if (bio == "") {
      toast.error("please add your bio");
    } else if (!file) {
      toast.error("please choose your profile pic");
    } else {
      const fileName = new Date().getTime() + file?.name;
      const storage = getStorage(app);
      const StorageRef = ref(storage, fileName);

      const uploadTask = uploadBytesResumable(StorageRef, file);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          // Observe state change events such as progress, pause, and resume
          // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
          switch (snapshot.state) {
            case "paused":
              console.log("Upload is paused");
              break;
            case "running":
              console.log("Upload is running");
              break;
          }
        },
        (error) => {
          // Handle unsuccessful uploads
        },
        () => {
          // Handle successful uploads on complete
          // For instance, get the download URL: https://firebasestorage.googleapis.com/...
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            updateProfile(
              dispatch,
              {
                age: age,
                gender: gender,
                interestIn: interestIn,
                location: location,
                relationshipStatus: relationshipStatus,
                relationshipType: relationshipType,
                profilePic: downloadURL,
                bio: bio,
              },
              accessToken
            );
          });
        }
      );
      nevigate("/member-single");
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
          <div className="image"></div>
          <div className="col-lg-7">
            <div className="log-reg-inner">
              <div className="section-header">
                <h2 className="title">Profile Details </h2>
              </div>
              <div className="main-content">
                <form action="#">
                  <div className="form-group">
                    <WrapItem
                      my="4"
                      display={"flex"}
                      justifyContent="center"
                      style={{}}>
                      <img
                        src={imagePrev ? imagePrev : img1}
                        style={{
                          height: "300px",
                          borderRadius: "100%",
                        }}
                      />
                    </WrapItem>
                    <Box my={"4"}>
                      <label htmlFor="chooseAvatar" children="Choose Avatar">
                        Choose Profile Pic
                        <div style={{ fontSize: "50px" }}>
                          <AiFillPlusCircle className="addImagePlus" />
                          <Input
                            accept="image/*"
                            required
                            id="chooseAvatar"
                            type={"file"}
                            focusBorderColor="yellow.500"
                            css={fileUploadStyle}
                            onChange={changeImageHandler}
                            height={0}
                            width={0}
                          />
                        </div>
                      </label>
                    </Box>

                    <label>Age</label>
                    <input
                      type="text"
                      className="my-form-control"
                      value={age}
                      onChange={(e) => setAge(e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <label>I am a*</label>
                    <div className="banner__inputlist">
                      <div className="s-input me-3">
                        <input
                          type="radio"
                          name="gender1"
                          id="males1"
                          checked={gender === "Male"}
                          onChange={(e) => setGender("Male")}
                        />
                        <label htmlFor="males1">Man</label>
                      </div>
                      <div className="s-input">
                        <input
                          type="radio"
                          name="gender1"
                          id="females1"
                          checked={gender === "Female"}
                          onChange={(e) => setGender("Female")}
                        />
                        <label htmlFor="females1">Woman</label>
                      </div>
                      <div className="s-input" style={{ marginLeft: "15px" }}>
                        <input
                          type="radio"
                          name="gender1"
                          id="other1"
                          checked={gender === "Other"}
                          onChange={(e) => setGender("Other")}
                        />
                        <label htmlFor="other1">Other</label>
                      </div>
                    </div>
                  </div>
                  <div className="form-group">
                    <label>Looking for a*</label>
                    <div className="banner__inputlist">
                      <div className="s-input me-3">
                        <input
                          type="radio"
                          name="gender2"
                          id="males"
                          checked={interestIn === "Male"}
                          onChange={(e) => setInterestIn("Male")}
                        />
                        <label htmlFor="males">Man</label>
                      </div>
                      <div className="s-input">
                        <input
                          type="radio"
                          name="gender2"
                          id="females"
                          checked={interestIn === "Female"}
                          onChange={(e) => setInterestIn("Female")}
                        />
                        <label htmlFor="females">Woman</label>
                      </div>
                      <div className="s-input" style={{ marginLeft: "15px" }}>
                        <input
                          type="radio"
                          name="gender2"
                          id="other"
                          checked={interestIn === "Other"}
                          onChange={(e) => setInterestIn("Other")}
                        />
                        <label htmlFor="other2">Other</label>
                      </div>
                    </div>
                  </div>
                  <div className="form-group">
                    <label>Marital status*</label>
                    <div className="banner__inputlist">
                      <div className="s-input me-3">
                        <input
                          type="radio"
                          name="gender3"
                          id="males3"
                          onChange={(e) => setRelationshipStatus("Single")}
                        />
                        <label htmlFor="males3">Single</label>
                      </div>
                      <div className="s-input">
                        <input
                          type="radio"
                          name="gender3"
                          id="females3"
                          onChange={(e) => setRelationshipStatus("Marid")}
                        />
                        <label htmlFor="females3">Married</label>
                      </div>
                    </div>
                  </div>
                  <div className="form-group">
                    <label>Relationship Type*</label>
                    <div className="banner__inputlist row">
                      <div className="s-input col-md-4">
                        <input
                          type="radio"
                          name="gender4"
                          id="longterm"
                          onChange={(e) => setRelationshipType("Long Term")}
                        />
                        <label htmlFor="longterm">Long Term</label>
                      </div>
                      <div className="s-input col-md-4">
                        <input
                          type="radio"
                          name="gender4"
                          id="shortterm"
                          onChange={(e) => setRelationshipType("Short Term")}
                        />
                        <label htmlFor="shortterm">Short Term</label>
                      </div>
                      <div className="s-input col-md-4">
                        <input
                          type="radio"
                          name="gender4"
                          id="friendship"
                          onChange={(e) => setRelationshipType("Friendship")}
                        />
                        <label htmlFor="friendship">Friendship</label>
                      </div>
                      <div className="s-input col-md-4">
                        <input
                          type="radio"
                          name="gender4"
                          id="casual"
                          onChange={(e) => setRelationshipType("Casual")}
                        />
                        <label htmlFor="casual">Casual</label>
                      </div>
                      <div className="s-input col-md-4">
                        <input
                          type="radio"
                          name="gender4"
                          id="hookups"
                          onChange={(e) => setRelationshipType("Marid")}
                        />
                        <label htmlFor="hookups">Hookups</label>
                      </div>
                    </div>
                  </div>
                  <div className="form-group">
                    <label>City*</label>
                    <input
                      type="text"
                      className="my-form-control"
                      placeholder="Enter Your City"
                      onChange={(e) => setLocation(e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <label>About You*</label>
                    <input
                      type="text"
                      className="my-form-control"
                      placeholder="Enter Your City"
                      onChange={(e) => setBio(e.target.value)}
                    />
                  </div>

                  <div className="text-center">
                    <button
                      type="submit"
                      className="default-btn"
                      onClick={useHandler}>
                      <span>Add Profile</span>
                    </button>
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

export default AddProfile;
