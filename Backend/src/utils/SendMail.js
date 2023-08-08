import { json } from "express";
import nodemailer from "nodemailer";
export const sendMail = async (req, res) => {
  try {
    // console.log(req);
    const transporter = nodemailer.createTransport({
      host: "smtp.ethereal.email",
      port: 587,
      auth: {
        user: "marianna30@ethereal.email",
        pass: "Qphv9PsRNfmNGqahu9",
      },
    });
    const info = await transporter.sendMail({
      from: "testing111404@gmail.com",
      to: req.to,
      subject: req.subject,
      html: req.html,
    });
    return;
    //return res.status(200);
  } catch (err) {
    console.log(err);
  }
};
