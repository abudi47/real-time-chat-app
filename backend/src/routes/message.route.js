import express from "express";
import {
  getMessages,
  getSideBarUsers,
  sendMessage,
} from "../controllers/message.controller.js";
import { authenticated } from "../middleware/auth.middleware.js";
import multer from "multer";
import Upload from "../middleware/Multer.js";

const router = express.Router();

router.get("/users", authenticated, getSideBarUsers);
router.post(
  "/sendMessage/:id",
  authenticated,
  Upload.single("image"),
  sendMessage
);
router.get("/getMessages/:id", authenticated, getMessages);

export default router;
