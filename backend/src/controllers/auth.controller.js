import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../lib/utils.js";
export const signup = async (req, res) => {
  try {
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
    } else {
      res.status(400).json({ message: "invalid userData" });
    }
  } catch (error) {
    return res.status(500).json({ message: "INTERNAL SERVER ERROR" });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const validUser = await User.findOne({ email });
    if (!validUser) {
      return res.status(401).json({
        message: "USER not Found ",
      });
    }

    const validPassword = await bcrypt.compare(password, validUser.password);

    if (!validPassword) {
      return res.status(401).json({
        message: "wrong credential",
      });
    }
    generateToken(validUser._id, res);
    res.status(201).json({
      _id: validUser._id,
      email: validUser.email,
      fullName: validUser.fullName,
      profilePic: validUser.profilePic,
    });
  } catch (error) {
    console.log("Error in login controller", error.message);
    return res.status(500).json({ message: "INTERNAL SERVER ERROR" });
  }
};

export const logout = (req, res) => {
  try {
    res.clearCookie("jwt", "", { maxAge: 0 });
    res.status(201).json({
      message: "User logged out Successfully",
    });
  } catch (error) {
    console.log("Error in logout controller", error.message);
    return res.status(500).json({ message: "INTERNAL SERVER ERROR" });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const profilePic = req.body;

    const userId = req.user._id;

    if (!profilePic) {
      return res.status(400).json({
        message: "profile pic is required",
      });
    }

    const uploadResoponse = await cloudinary.uploader.upload(profilePic);
    const updateUser = await User.findByIdAndUpdate(
      userId,
      { profilePic: uploadResoponse.secure_url },
      { new: true }
    );
    res.status(201).json(updateUser);
  } catch (error) {
    console.log("Error in updating profile", error.message);
    return res.status(500).json({ message: "INTERNAL SERVER ERROR" });
  }
};


export const checkAuth = async (req,res) => {
  try {
    res.status(201).json(req.user);
  } catch (error) {
    console.log("Error in checkAuth controller", error.message);
    return res.status(500).json({ message: "INTERNAL SERVER ERROR..." });
  }

}