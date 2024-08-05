import express from "express";
import protect from "../middleware/authMiddleware.js";
import accessChats from "../controllers/chat/accessChats.js";
import createGroupChat from "../controllers/chat/createGroupChat.js";
import fetchChats from "../controllers/chat/fetchChats.js";
const router = express.Router();

// all routes are after /api/chat
// protect middleware ensures that user is logged in
// put used to update data 
router.route('/').post(protect, accessChats);
router.route('/').get(protect, fetchChats);
router.route('/group').post(protect, createGroupChat);
// router.route('/rename').put(protect, renameGroup);
// router.route('/groupremove').put(protect, removeFromGroup);
// router.route('/groupadd').put(protect, addToGroup);

export default router;
