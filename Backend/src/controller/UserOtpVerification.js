import userOtpVerification from "../model/UserOtpVerfication.js";
import User from "../model/User.js";
import bcrypt from "bcrypt";
import { sendMail } from "../utils/SendMail.js";
export const sendOTPVerificationEmail = async (req, res) => {
  const { email } = req.body;
  try {
    const otp = `${Math.floor(1000 + Math.random() * 9000)}`;
    const mailOptions = {
      from: process.env.AUTH_EMAIL,
      to: email,
      subject: "Verify your Email",
      html: `<p>Enter <b>${otp}</b> in the app to verify your email address and complete your registration.<p>`,
    };
    await userOtpVerification.deleteMany({ email });
    const salt = 10;
    const hashedOTP = await bcrypt.hash(otp, salt);
    const newOTPVerification = await new userOtpVerification({
      email: email,
      otp: hashedOTP,
      createdAt: Date.now(),
      expiresAt: Date.now() + 3600000,
    });
    const newOtp = await newOTPVerification.save();
    //console.log(newOtp);
    await sendMail(mailOptions);
    res.json({
      status: "PENDING",
      message: "verification email sent",
      data: {
        email,
      },
    });
  } catch (error) {
    res.json({
      status: "FAILED",
      message: error.message,
    });
  }
};
export const VerifyOTP = async (req, res) => {
  try {
    const { email, otp } = req.body;
    if (!email || !otp) {
      //const user = await User.findById(userId);
      //console.log(email);
      return res.json({
        status: "pending",
        message: "Empty otp details are not allowed!",
      });
    } else {
      const userRecords = await userOtpVerification.find({ email: email });
      if (userRecords.length <= 0) {
        return res.json({
          status: "pending",
          message: "Resend Otp",
          email: email,
        });
      } else {
        const { expiresAt } = userRecords[0];
        const hashedOTP = userRecords[0].otp;
        if (expiresAt < Date.now()) {
          await userOtpVerification.deleteMany({ email: email });
          return res.json({
            status: "pending",
            message: "Code has expired. Please request again.",
          });
        } else {
          const validOTP = await bcrypt.compare(otp, hashedOTP);
          // const user = await User.findById(userId);
          // console.log(validOTP);
          if (!validOTP) {
            return res.json({
              status: "invalid",
              message: `Invalid code passed. Check your Inbox.`,
            });
          } else {
            // await User.updateOne({ _id: userId }, { verification: "complete" });
            await userOtpVerification.deleteMany({ email: email });
            //  const user = await User.findById(userId);
            return res.json({
              status: "VERIFIED",
              message: `User email has been verified Successfully`,
            });
          }
        }
      }
    }
  } catch (error) {
    res.status(500).json({ status: "Failed", error: error.message });
  }
};
export const ResendOtp = async (req, res) => {
  try {
    const { email } = req.body;
    console.log(email);
    if (!email) {
      return res.json({
        status: "pending",
        message: "email is not correct",
      });
    } else {
      await userOtpVerification.deleteMany({ email });
      const otp = `${Math.floor(1000 + Math.random() * 9000)}`;
      const mailOptions = {
        from: process.env.AUTH_EMAIL,
        to: email,
        subject: "Verify your Email",
        html: `<p>Enter <b>${otp}</b> in the app to verify your email address and complete your registration.<p>`,
      };
      const salt = 10;
      const hashedOTP = await bcrypt.hash(otp, salt);
      const newOTPVerification = await new userOtpVerification({
        email: email,
        otp: hashedOTP,
        createdAt: Date.now(),
        expiresAt: Date.now() + 3600000,
      });
      const newOtp = await newOTPVerification.save();
      //console.log(newOtp);
      await sendMail(mailOptions);
      res
        .status(200)
        .json({ status: "pending", message: "otp is sent to your mail" });
    }
  } catch (error) {
    res.status(500).json({ status: "Failed", error: error.message });
  }
};
