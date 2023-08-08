import express from "express";
import {
  VerifyOTP,
  ResendOtp,
  sendOTPVerificationEmail,
} from "../../controller/UserOtpVerification.js";
const router = express.Router();
router.post("/createotp", sendOTPVerificationEmail);
router.post("/verifyotp", VerifyOTP);
router.post("/resendotp", ResendOtp);
export default router;
