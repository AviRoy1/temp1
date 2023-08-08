import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import User from "../model/User.js";

dotenv.config();

const subscriptionCheck = async (req, res, next) => {
  let user = await User.findById(req.user.id);
  if (user.subscription.plan === "1") {
    let d1 = user.subscription.date;
    let curdate = new Date();
    const timediff = curdate - d1;
    const datediff = timediff / (1000 * 60 * 60 * 24);
    if (datediff > 7) {
      user.subscription.plan = "0";
      user.save();
    }
  }
  if (user.subscription.plan === "2") {
    let d1 = user.subscription.date;
    let curdate = new Date();
    const timediff = curdate - d1;
    const datediff = timediff / (1000 * 60 * 60 * 24);
    if (datediff > 30) {
      user.subscription.plan = "0";
      user.save();
    }
  }
  if (user.subscription.plan === "3") {
    let d1 = user.subscription.date;
    let curdate = new Date();
    const timediff = curdate - d1;
    const datediff = timediff / (1000 * 60 * 60 * 24);
    if (datediff > 180) {
      user.subscription.plan = "0";
      user.save();
    }
  }

  next();
};

export default subscriptionCheck;
