import { createSlice } from "@reduxjs/toolkit";

export const useReducer = createSlice({
  name: "User",
  initialState: {
    user: null,
    isFetching: false,
    error: null,
    message: null,
    accessToken: null,
    isVerified: "pending",
  },
  reducers: {
    loginStart: (state) => {
      state.isFetching = true;
    },
    loginSuccess: (state, action) => {
      state.isFetching = false;
      state.user = action.payload.user;
      state.accessToken = action.payload.accessToken;
      state.message = action.payload.message;
    },
    loginFailure: (state, action) => {
      state.isFetching = false;
      state.error = true;
      state.message = action.payload;
    },
    loadUserRequest: (state) => {
      state.isFetching = true;
    },
    loadUserSuccess: (state, action) => {
      state.isFetching = false;
      state.user = action.payload.user;
    },
    loadUserFail: (state, action) => {
      state.isFetching = false;
      state.error = action.payload;
    },
    updateProfileRequest: (state) => {
      state.isFetching = true;
    },
    updateProfileSuccess: (state, action) => {
      state.isFetching = false;
      state.message = action.payload.message;
      state.user = action.payload.user;
    },
    updateProfileFail: (state, action) => {
      state.isFetching = false;
      state.message = action.payload.message;
      state.error = action.payload;
    },
    addPhotoRequest: (state) => {
      state.isFetching = true;
    },
    addPhotoSuccess: (state, action) => {
      state.isFetching = false;
      state.message = action.payload.message;
      state.user = action.payload.user;
    },
    addPhotoFail: (state, action) => {
      state.isFetching = false;
      state.error = action.payload;
    },
    logout: (state) => {
      state.user = null;
      state.accessToken = null;
      state.isVerified = "pending";
    },
    otpverifyRequest: (state) => {
      state.isFetching = true;
    },
    otpverifySuccess: (state, action) => {
      state.isFetching = false;
      state.isVerified = action.payload.status;
      state.user = action.payload.user;
    },
    otpverifyFail: (state) => {
      state.isFetching = false;
    },
    clearError: (state) => {
      state.error = null;
    },
    clearMessage: (state) => {
      state.message = null;
    },
  },
});

export const {
  loginSuccess,
  loginFailure,
  loginStart,
  logout,
  clearMessage,
  clearError,
  loadUserFail,
  loadUserRequest,
  loadUserSuccess,
  updateProfileFail,
  updateProfileSuccess,
  updateProfileRequest,
  addPhotoFail,
  addPhotoRequest,
  addPhotoSuccess,
  otpverifyFail,
  otpverifyRequest,
  otpverifySuccess,
} = useReducer.actions;
export default useReducer.reducer;
