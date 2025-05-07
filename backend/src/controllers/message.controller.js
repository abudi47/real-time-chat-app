import cloudinary from "../lib/cloudinary.js";
import Message from "../models/message.model.js";
import User from "../models/user.model.js";
import multer from "multer";

export const getSideBarUsers = async (req, res) => {
  try {
    const loggedInUser = req.user._id;
    const filteredUsers = await User.find({
      _id: { $ne: loggedInUser },
    }).select("-password");

    res.status(201).json(filteredUsers);

    if (!filteredUsers) {
      return res.status(301).json({
        message: "yser not found",
      });
    }
  } catch (error) {
    console.log("Error in getsidebarusers controller", error.message);

    return res.status(500).json({ message: "INTERNAL SERVER ERROR" });
  }
};

export const getMessages = async (req, res) => {
  try {
    const { id: usrToChatId } = req.params;
    const myId = req.user._id;

    const messages = await Message.find({
      $or: [
        { senderId: myId, receiverId: usrToChatId },
        { senderId: usrToChatId, receiverId: myId },
      ],
    });

    res.status(200).json({
      messages,
    });
  } catch (error) {
    console.log("Error in getmessage controller:", error.message);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const sendMessage = async (req, res) => {
  try {
    const { text } = req.body;
    const { id: receiverId } = req.params;

    const senderId = req.user._id;

    let imageUrl;
    if (req.file) {
      try {
        const uploadResponse = await cloudinary.uploader.upload(req.file.path);
        imageUrl = uploadResponse.secure_url;
      } catch (error) {
        console.log("Error uploading to Cloudinary:", error.message);
        return res.status(500).json({ message: "Error uploading image" });
      }
    }

    const newMessage = new Message({
      senderId,
      receiverId,
      text,
      image: imageUrl || "",
    });
    await newMessage.save();
    res.status(201).json(newMessage);
  } catch (error) {
    console.log("Error in sending controller:", error.message);
    return res.status(500).json({ message: "INTERNAL SERVER ERROR" });
  }
};
