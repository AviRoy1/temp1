import express from "express";
import {
  createChat,
  findChat,
  userChats,
  userDetails,
  findfriends,
  searchUsers,
} from "../../controller/Chat.js";
import verifytoken from "../../middlewares/verifyToken.js";
const router = express.Router();

router.post("/", createChat);
router.post("/getall", userChats);
router.post("/detail", userDetails);
router.get("/find/:firstId/:secondId", findChat);
router.get("/find/friends", verifytoken, findfriends);
router.post("/search/users", searchUsers);

export default router;
