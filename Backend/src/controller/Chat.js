import mongoose from "mongoose";
import ChatModel from "../model/Chat.js";
import User from "../model/User.js";
import UserActivity from "../model/UserActivity.js";
export const createChat = async (req, res) => {
  let count = 0;
  let plan = req.body.plan;
  if (plan === "0") {
    count = 10;
  } else if (plan === "1") {
    count = 50;
  } else if (plan === "2") {
    count = 200;
  } else if (plan === "3") {
    count = 100000;
  }
  const newChat = new ChatModel({
    members: [req.body.senderId, req.body.receiverId],
    TotalMessage: count,
  });
  try {
    const result = await newChat.save();
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json(error);
  }
};
export const userChats = async (req, res) => {
  try {
    const userId = req.body.userId;
    const chat = await ChatModel.find({
      members: { $in: [userId] },
    });
    res.status(200).json(chat);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};
export const userDetails = async (req, res) => {
  const id = req.body.userId;
  try {
    const details = await User.findOne(
      { _id: id },
      { name: 1, profilePic: 1, subscription: 1 }
    );
    res.status(200).json(details);
  } catch (error) {
    res.status(500).json(error);
  }
};
export const findChat = async (req, res) => {
  try {
    const chat = await ChatModel.findOne({
      members: { $all: [req.params.firstId, req.params.secondId] },
    });
    res.status(200).json(chat);
  } catch (error) {
    res.status(500).json(error);
  }
};
export const findfriends = async (req, res) => {
  try {
    const me = await User.findById(req.user.id);
    let userActivity = await UserActivity.findOne({ userId: me._id });
    if (!userActivity) {
      userActivity = await UserActivity.create({ userId: me._id });
    }
    let result = new Array();
    await UserActivity.findById(userActivity._id)
      .populate("matchedUsers", "name profilePic")
      .exec()
      .then((userActivity) => {
        const matchedUsersWithInfo = userActivity.matchedUsers;
        result = matchedUsersWithInfo;
      })
      .catch((err) => {
        console.error("Error retrieving UserActivity:", err);
        // Handle the error
      });
    return res.status(200).json({ friends: result });
  } catch (error) {
    res.status(500).json(error);
  }
};
export const searchUsers = async (req, res) => {
  const { name, userId } = req.body;
  try {
    const users = await User.find({
      name: { $regex: `^${name}`, $options: "i" },
    });
    const result = await Promise.all(
      users.map(async (user) => {
        //console.log(user);
        const chat = await ChatModel.findOne({
          members: {
            $all: [userId, user._id],
          },
        });
        // console.log(chat);
        return chat;
      })
    );
    const filteredResult = result.filter((item) => item !== null);
    res.status(200).json(filteredResult);
  } catch (error) {
    res.status(500).json(error);
  }
};
export const upgradeChats = async (req, res) => {
  const { userId, plan } = req.body;
  let messageLimit = 10;
  if (plan == "1") {
    messageLimit = 50;
  } else if (plan == "2") {
    messageLimit = 200;
  } else if (plan == "3") {
    messageLimit = 10000;
  }
  try {
    const Chats = await ChatModel.find({
      members: { $in: [userId] },
    });
    for (const chat of Chats) {
      if (messageLimit > chat.TotalMessage) {
        chat.TotalMessage = messageLimit;
        await chat.save();
      }
    }
    res.status(200).json(Chats);
  } catch (error) {
    res.status(500).json(error);
  }
};
export const getChatinfo = async (req, res) => {
  const { chatId } = req.body;
  try {
    const chat = await ChatModel.findOne({ _id: chatId });
    res.status(500).json(chat);
  } catch (err) {
    res.status(200).json(error);
  }
};
