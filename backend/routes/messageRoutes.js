import express from "express";
import protect from "../middleware/authMiddleware.js";
import sendMessage from "../controllers/message/sendMessage.js";
import allMessages from "../controllers/message/allMessages.js";
const router = express.Router();


router.route("/").post(protect, sendMessage); // send message
router.route("/:chatId").get(protect, allMessages); // get all messages

export default router;