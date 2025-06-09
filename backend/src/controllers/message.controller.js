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
    let files = []
    if (req.file) {
      let resource_type = "auto";
      const mime = req.file.mimetype;

      try {
        if (
          mime === "application/pdf" ||
          mime === "application/vnd.ms-powerpoint" ||
          mime ===
            "application/vnd.openxmlformats-officedocument.presentationml.presentation"
        ) {
          resource_type = "raw"; // PDFs and presentations need this
        }
        const result = await cloudinary.uploader.upload(req.file.path, {
          resource_type: resource_type,
          folder: "real-chat",
        });
        files = [result.secure_url];
      } catch (error) {
        console.log("Error uploading to Cloudinary:", error.message);
        return res.status(500).json({ message: "Error uploading image" });
      }
    }

    const newMessage = new Message({
      senderId,
      receiverId,
      text,
      files: files || [],
    });
    await newMessage.save();
    res.status(201).json(newMessage);
  } catch (error) {
    console.log("Error in sending controller:", error.message);
    return res.status(500).json({ message: "INTERNAL SERVER ERROR" });
  }
};
