import { createSlice } from "@reduxjs/toolkit";

export const matchReducer = createSlice({
  name: "Match",
  initialState: {
    matchuser: null,
    isFetching: false,
    error: false,
    message: null,
  },
  reducers: {
    matchStart: (state) => {
      state.isFetching = true;
    },
    matchSuccess: (state, action) => {
      state.isFetching = false;
      state.matchuser = action.payload;
      state.message = action.payload.message;
    },
    matchFailure: (state, action) => {
      state.isFetching = false;
      state.error = true;
      state.message = action.payload;
    },

    clearError: (state) => {
      state.error = false;
    },
    clearMessage: (state) => {
      state.message = null;
    },
  },
});

export const { matchSuccess, matchFailure, matchStart } = matchReducer.actions;
export default matchReducer.reducer;
