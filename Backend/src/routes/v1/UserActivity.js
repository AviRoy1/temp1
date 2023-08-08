import express from "express";
import joi from "joi";
import { getErrorMessage } from "../../utils/joi.util.js";
import verifytoken from "../../middlewares/verifyToken.js";
import {
  likeUser,
  dislikeUser,
  blockUser,
  viewprofile,
} from "../../controller/UserActivity.js";
import subscriptionCheck from "../../middlewares/subscriptionCheck.js";

const router = express.Router();

const likeAPISchema = joi.object().keys({
  id: joi.string().trim().required(),
});
router.put(
  "/like/:id",
  verifytoken,
  subscriptionCheck,
  async (req, res, next) => {
    try {
      req.params = await likeAPISchema.validateAsync(req.params);
      next();
    } catch (err) {
      return res.status(422).json({ message: getErrorMessage(err) });
    }
  },
  likeUser
);

//   Dislike
const dislikeAPISchema = joi.object().keys({
  id: joi.string().trim().required(),
});
router.put(
  "/dislike/:id",
  verifytoken,
  subscriptionCheck,
  async (req, res, next) => {
    try {
      req.params = await dislikeAPISchema.validateAsync(req.params);
      next();
    } catch (err) {
      return res.status(422).json({ message: getErrorMessage(err) });
    }
  },
  dislikeUser
);

//   Block
const blockAPISchema = joi.object().keys({
  id: joi.string().trim().required(),
});
router.put(
  "/block/:id",
  verifytoken,
  subscriptionCheck,
  async (req, res, next) => {
    try {
      req.params = await blockAPISchema.validateAsync(req.params);
      next();
    } catch (err) {
      return res.status(422).json({ message: getErrorMessage(err) });
    }
  },
  blockUser
);

//   view other user profile
const viewProfileAPISchema = joi.object().keys({
  id: joi.string().trim().required(),
});
router.put(
  "/visiteprofile/:id",
  verifytoken,
  subscriptionCheck,
  async (req, res, next) => {
    try {
      req.params = await viewProfileAPISchema.validateAsync(req.params);
      next();
    } catch (err) {
      return res.status(422).json({ message: getErrorMessage(err) });
    }
  },
  viewprofile
);

export default router;
