import express from "express";
import {
  login,
  logout,
  signup,
  updateProfile,
  checkAuth,
} from "../controllers/auth.controller.js";
import Upload from "../middleware/Multer.js";

import { authenticated } from "../middleware/auth.middleware.js";
const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);

router.put("/updateProfile/:id", authenticated,Upload.single("profilePic"),updateProfile);
router.get("/check", authenticated, checkAuth)

export default router;
