import axios from "axios";
import { server } from "../store";
import {
  loginFailure,
  loginStart,
  loginSuccess,
  logout,
  clearMessage,
  clearError,
  loadUserFail,
  loadUserRequest,
  loadUserSuccess,
  updateProfileFail,
  updateProfileRequest,
  updateProfileSuccess,
  addPhotoFail,
  addPhotoRequest,
  addPhotoSuccess,
  otpverifyFail,
  otpverifyRequest,
  otpverifySuccess,
} from "../reducers/userReducer";

export const signup = async (dispatch, user) => {
  // dispatch(clearMessage);

  dispatch(loginStart());
  try {
    const res = await axios.post(`${server}/api/user/signup`, user);
    dispatch(loginSuccess(res.data));
  } catch (error) {
    // console.log(error.response);
    dispatch(loginFailure(error.response.data.message));
  }
};

export const login = async (dispatch, user) => {
  dispatch(clearMessage);

  dispatch(loginStart());
  try {
    const res = await axios.post(`${server}/api/user/login`, user);
    dispatch(loginSuccess(res.data));
  } catch (error) {
    console.log(error.response);
    dispatch(loginFailure(error.response.data.message));
  }
};

export const loaduser = async (dispatch, accessToken) => {
  dispatch(clearMessage);

  dispatch(loadUserRequest());
  try {
    const res = await axios.get(`${server}/api/user/me`, {
      headers: {
        "Content-Type": "application/JSON",
        token: accessToken,
      },
    });
    console.log(res.data);
    dispatch(loadUserSuccess(res.data));
  } catch (error) {
    dispatch(loadUserFail(error.response.data.message));
  }
};

export const addProfile = async (dispatch, data, accessToken) => {
  dispatch(updateProfileRequest());
  try {
    const res = await axios.post(`${server}/api/user/addprofile`, data, {
      headers: {
        "Content-Type": "application/JSON",
        token: accessToken,
      },
      withCredentials: true,
    });
    // console.log(res.data);
    dispatch(updateProfileSuccess(res.data));
  } catch (error) {
    dispatch(updateProfileFail(error.response.data.message));
  }
};

export const updateProfile = async (dispatch, data, accessToken) => {
  dispatch(updateProfileRequest());
  try {
    const res = await axios.post(`${server}/api/user/profileupdate`, data, {
      headers: {
        "Content-Type": "application/JSON",
        token: accessToken,
      },
      withCredentials: true,
    });
    // console.log(res.data);
    dispatch(updateProfileSuccess(res.data));
  } catch (error) {
    dispatch(updateProfileFail(error.response.data.message));
  }
};

export const addPhoto = async (dispatch, data, accessToken) => {
  dispatch(addPhotoRequest());
  try {
    const res = await axios.post(`${server}/api/user/addphoto`, data, {
      headers: {
        "Content-Type": "application/JSON",
        token: accessToken,
      },
      withCredentials: true,
    });
    console.log("addd  -   ", res.data);
    dispatch(addPhotoSuccess(res.data));
  } catch (error) {
    dispatch(addPhotoFail(error.response.data.message));
  }
};

export const optVerify = async (dispatch, data) => {
  dispatch(otpverifyRequest());
  try {
    const res = await axios.post(`${server}/api/otp/verifyotp`, data);
    dispatch(otpverifySuccess(res.data));
  } catch (error) {
    dispatch(otpverifyFail(error.response.data.message));
  }
};

export const clearmessage = async (dispatch) => {
  dispatch(clearMessage());
};

export const clearerror = async (dispatch) => {
  dispatch(clearError());
};
