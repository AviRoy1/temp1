import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:5000/api/otp" });

export const verifyOtp = (data) => API.post("/verifyotp", data);
export const resendOtp = (data) => API.post("/resendotp", data);
