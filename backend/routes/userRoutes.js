import express from "express";
import { registerUser, authUser, allUsers } from "../controllers/userControllers.js";
import protect from "../middleware/authMiddleware.js"
const router = express.Router();

// all routes are after /api/user
router.route('/').post(registerUser) // for sign up
router.route('/').get(protect, allUsers) // get all users API
router.route('/login').post(authUser) // for login

// can also be written as router.post('x', y)

export default router;