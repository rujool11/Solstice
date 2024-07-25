import express from "express";
import registerUser from "../controllers/user/registerUser.js";
import authUser from "../controllers/user/authUser.js";
import allUsers from "../controllers/user/allUsers.js";
import protect from "../middleware/authMiddleware.js"
const router = express.Router();

// all routes are after /api/user
router.route('/').post(registerUser) // for sign up
router.route('/').get(protect, allUsers) // get all users API
router.route('/login').post(authUser) // for login

// can also be written as router.post('x', y)

export default router;