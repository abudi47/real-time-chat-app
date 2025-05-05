import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../lib/utils.js";
export const signup = async (req, res) => {
  const { fullName, email, password } = req.body;
  if (password.length < 4) {
    return res
      .status(400)
      .json({ message: "password length must be greater than 4" });
  }
  const user = await User.findOne({ email });
  if (user) {
    return res.status(400).json({ message: "user already exists" });
  }

  const salt = await bcrypt.genSalt(10);

  const hashedPassowrd = await bcrypt.hash(password, salt);

  const newUser = new User({
    fullName,
    email,
    password: hashedPassowrd,
  });

  if (newUser) {
    generateToken(newUser._id, res);
    await newUser.save();

    res.status(200).json({
      _id: newUser._id,
      email: newUser.email,
      fullName: newUser.fullName,
      profilePic: newUser.profilePic,
    });
  }else {
    res.status(400).json({message : "invalid userData"})
  }
};

export const login = (req, res) => {};

export const logout = (req, res) => {};
