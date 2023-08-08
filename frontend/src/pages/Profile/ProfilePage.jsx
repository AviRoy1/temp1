import {
  Box,
  FormLabel,
  Input,
  FormControl,
  FormHelperText,
  Stack,
} from "@chakra-ui/react";
import React, { useState, Component } from "react";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import app from "../firebase";
import { addPhoto, updateProfile } from "../../redux/actions/userAction";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "@mui/material";
import { AiFillPlusCircle } from "react-icons/ai";
import { toast, ToastContainer } from "react-toastify";
import BackToTop from "../../component/layout/BackToTop";
import MatchPopup from "../Match/MatchPopup";
import axios from "axios";

const BlueTickIcon = () => (
  <i
    className="fas fa-check-circle"
    style={{
      color: "rgb(0, 64, 255)",
      fontSize: "16px",
      marginLeft: "4px",
    }}
  />
);

const ProfilePage = () => {
  const { accessToken, user } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const [file, setfile] = useState(null);
  const [gender, setGender] = useState(user.gender);
  const [interestIn, setInterestIn] = useState(user.interestIn);
  const [name, setName] = useState(user.name);
  const [location, setLocation] = useState(user.location);
  const [relationshipType, setRelationshipType] = useState(
    user.relationshipType
  );
  const [relationshipStatus, setRelationshipStatus] = useState(
    user.relationshipStatus
  );
  const [age, setAge] = useState(user.age);
  const [isEditing, setIsEditing] = useState(false);
  const [userphotos, setUserPhotos] = useState(user.photos ?? []);
  const [editPhotos, setEditPhotos] = useState(false);

  const toggleEditMode = () => {
    setIsEditing((prevIsEditing) => !prevIsEditing);
  };

  const handleSaveChanges = () => {
    updateProfile(
      dispatch,
      {
        age: age,
        relationshipStatus: relationshipStatus,
        relationshipType: relationshipType,
        name: name,
        interestIn: interestIn,
        location: location,
      },
      accessToken
    );
    setIsEditing(false);
  };

  const handleAddPhoto = (e) => {
    const selectedFile = e.target.files[0];
    setfile(selectedFile);
    const fileName = new Date().getTime() + selectedFile?.name;
    const storage = getStorage(app);
    const StorageRef = ref(storage, fileName);

    const uploadTask = uploadBytesResumable(StorageRef, selectedFile);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
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
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          addPhoto(dispatch, { photo: downloadURL }, accessToken);
        });
      }
    );
  };

  const handleDelete = async (index) => {
    try {
      const data = {
        userId: user._id,
        index,
      };
      const response = await axios.post(
        "http://localhost:5000/api/user/delete/photo/",
        data
      );
      // toast.success("Image delete Successfully");
      setUserPhotos((userphotos) => userphotos.filter((_, i) => i !== index));

      setEditPhotos(!editPhotos);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div
      className="info"
      style={{ marginLeft: "auto", marginRight: "auto", maxWidth: "800px" }}>
      <div className="info-card mb-4">
        <div className="info-card-title">
          <h6>Profile Picture</h6>
        </div>
        <div className="info-card-content" style={{ textAlign: "center" }}>
          <img
            src={user.profilePic}
            alt="dating thumb"
            style={{ width: "300px", height: "350px", borderRadius: "10%" }}
          />
        </div>
      </div>

      {/* Show Other Photos Section */}
      <div className="info-card mb-4">
        <div
          className="info-card-title"
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}>
          <h6>Show Other Photos</h6>
          <span
            style={{
              backgroundColor: "#213366",
              color: "white",
              padding: "5px",
              borderRadius: "10px",
            }}
            className="edit_icon"
            onClick={() => setEditPhotos(!editPhotos)}>
            <i class="bi bi-pen"></i>
          </span>
        </div>
        <div className="info-card-content row">
          {userphotos.length > 0 &&
            userphotos.map((photo, index) => (
              <div
                key={index}
                style={{
                  height: "320px",
                  width: "250px",
                  marginRight: "20px",
                  textAlign: "center",
                }}
                className="col-md-4 col-12 ">
                <img
                  key={index}
                  src={photo}
                  alt={`Photo ${index + 1}`}
                  className="photo-item"
                  style={{
                    height: "280px",
                    width: "100%",
                    borderRadius: "10%",
                  }}
                />
                <div
                  style={{
                    cursor: "pointer",
                    textAlign: "right",
                    display: editPhotos ? "block" : "none",
                  }}>
                  <label
                    onClick={() => handleDelete(index)}
                    className="trash_icon">
                    <i class="bi bi-trash"></i>
                  </label>
                </div>
              </div>
            ))}

          {/* Add Photo Section */}

          {userphotos && userphotos.length < 5 && (
            <div
              className="col-md-4"
              style={{
                marginTop: "0px",
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
              }}>
              <label htmlFor="chooseAvatar" children="Add Photo">
                <div style={{ fontSize: "50px", textAlign: "center" }}>
                  <AiFillPlusCircle className="addImagePlus" />
                  <Input
                    accept="image/*"
                    required
                    id="chooseAvatar"
                    type={"file"}
                    focusBorderColor="yellow.500"
                    onChange={handleAddPhoto}
                    height={0}
                    width={0}
                    style={{ display: "none" }}
                  />
                </div>
              </label>
            </div>
          )}
        </div>
      </div>

      <div className="info-card mb-4">
        <div className="info-card-title">
          <h6>Basic Info</h6>
        </div>
        <div className="info-card-content">
          {isEditing ? (
            <form>
              <Stack spacing={4}>
                <FormControl>
                  <FormLabel>Name</FormLabel>
                  <Input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                  {user.subscription.plan === "2" ||
                  user.subscription.plan === "3" ? (
                    <BlueTickIcon />
                  ) : null}
                  <FormHelperText>Your name</FormHelperText>
                </FormControl>

                <FormControl>
                  <FormLabel>I'm a</FormLabel>
                  {/* <input>{gender}</input> */}
                  <select
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}>
                    <option value="male">{gender}</option>
                  </select>
                  <FormHelperText>Select your gender</FormHelperText>
                </FormControl>

                <FormControl>
                  <FormLabel>Looking for a</FormLabel>
                  <select
                    value={interestIn}
                    onChange={(e) => setInterestIn(e.target.value)}>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                  <FormHelperText>Select your interest</FormHelperText>
                </FormControl>

                {/* Add other editable fields here */}
                <FormControl>
                  <FormLabel>Marital Status</FormLabel>
                  <select
                    value={relationshipStatus}
                    onChange={(e) => setRelationshipStatus(e.target.value)}>
                    <option value="Single">Single</option>
                    <option value="Married">Married</option>
                  </select>
                  <FormHelperText>Select your marital status</FormHelperText>
                </FormControl>

                <FormControl>
                  <FormLabel>Age</FormLabel>
                  <Input
                    type="text"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                  />
                  <FormHelperText>Your age</FormHelperText>
                </FormControl>

                <FormControl>
                  <FormLabel>Relationship Type</FormLabel>
                  <select
                    value={relationshipType}
                    onChange={(e) => setRelationshipType(e.target.value)}>
                    <option value="Friendship">Friendship</option>
                    <option value="Long Term">Long Term</option>
                    <option value="Short Term">Short Term</option>
                    <option value="Casual">Casual</option>
                    <option value="Hookups">Hookups</option>
                  </select>
                  <FormHelperText>Select your relationship type</FormHelperText>
                </FormControl>

                <FormControl>
                  <FormLabel>Location</FormLabel>
                  <Input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                  />
                  <FormHelperText>Your location</FormHelperText>
                </FormControl>

                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleSaveChanges}>
                  Save Profile
                </Button>
              </Stack>
            </form>
          ) : (
            <Stack spacing={4}>
              <Box>
                <p className="info-name">Name</p>
                <p className="info-details">
                  {user?.name}
                  {user.subscription.plan === "2" ||
                  user.subscription.plan === "3" ? (
                    <BlueTickIcon />
                  ) : null}
                </p>
              </Box>

              <Box style={{ display: "flex" }}>
                <p className="info-name">Age</p>
                <p className="info-details">{user.age}</p>
              </Box>

              <Box>
                <p className="info-name">I'm a</p>
                <p className="info-details">{user.gender}</p>
              </Box>

              <Box>
                <p className="info-name">Looking for a</p>
                <p className="info-details">{user.interestIn}</p>
              </Box>

              {/* Add other non-editable fields here */}
              <Box>
                <p className="info-name">Marital Status</p>
                <p className="info-details">{user.relationshipStatus}</p>
              </Box>

              <Box>
                <p className="info-name">Relationship Type</p>
                <p className="info-details">{user.relationshipType}</p>
              </Box>

              <Box>
                <p className="info-name">Location</p>
                <p className="info-details">{user.location}</p>
              </Box>

              <Button
                variant="contained"
                color={isEditing ? "secondary" : "primary"}
                onClick={toggleEditMode}>
                {isEditing ? "Cancel" : "Update Profile"}
              </Button>
            </Stack>
          )}
        </div>
      </div>
      <ToastContainer position="top-center" autoClose={2000} hideProgressBar />
      <BackToTop />
    </div>
  );
};

export default ProfilePage;
