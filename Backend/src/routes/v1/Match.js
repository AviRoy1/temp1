import express from "express";
import joi from "joi";
import { getErrorMessage } from "../../utils/joi.util.js";
import verifytoken from "../../middlewares/verifyToken.js";
import subscriptionCheck from "../../middlewares/subscriptionCheck.js";
import {
  matchlike,
  createMatch,
  matchdislike,
  undolastswap,
} from "../../controller/Match.js";

const router = express.Router();

router.post("/create", verifytoken, createMatch);

const likematchSchema = joi.object().keys({
  userid: joi.string().required().trim(),
});
router.post(
  "/like",
  verifytoken,
  subscriptionCheck,
  async (req, res, next) => {
    try {
      req.body = await likematchSchema.validateAsync(req.body);
      next();
    } catch (err) {
      return res.status(422).json({ message: getErrorMessage(err) });
    }
  },
  matchlike
);

const dislikematchSchema = joi.object().keys({
  userid: joi.string().required().trim(),
});
router.post(
  "/dislike",
  verifytoken,
  subscriptionCheck,
  async (req, res, next) => {
    console.log(req.body);
    try {
      req.body = await dislikematchSchema.validateAsync(req.body);
      next();
    } catch (err) {
      return res.status(422).json({ message: getErrorMessage(err) });
    }
  },
  matchdislike
);

router.post("/undoswap", verifytoken, subscriptionCheck, undolastswap);

export default router;
