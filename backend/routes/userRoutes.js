import express from "express";
import { registerUser, authUser } from "../controllers/userControllers.js";
const router = express.Router();

// all routes are after /api/user
router.route('/').post(registerUser) // for sign up
router.route('/login').post(authUser) // for login

// can also be written as router.post('x', y)

export default router;