import jwt from 'jsonwebtoken';

import User from "../models/user.model.js";
export const authenticated = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;
    if (!token) {
      return res.status(401).json({
        message: "unauthorized - No Token provided",
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded) {
      return res.status(401).json({
        message: "unauthorized - No Token provided",
      });
    }
    const user = await User.findById(decoded.userId).select("-password");

    if (!user) {
      return res.status(401).json({
        message: "unauthorized - No Token provided",
      });
    }

    req.user = user;

    next();  
  } catch (error) {
    console.log("the error is ", error)
    return res.status(500).json({ message: "INTERNAL SERVER ERRORrr" });
  }
};
