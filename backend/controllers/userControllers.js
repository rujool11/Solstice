import expressAsyncHandler from "express-async-handler";
import User from "../models/userModel.js";
import generateToken from "../config/generateToken.js";

const registerUser = expressAsyncHandler(async (req, res) => {
    const { name, email, password, pic } = req.body;

    if (!name || !email || !password) {
        res.status(400);
        throw new Error("please enter all required fields");
    }

    const userExists = await User.findOne({email});

    if (userExists) {
        res.status(400);
        throw new Error("user already exists");
    }

    const user = await User.create({
        name,
        email,
        password,
        pic
    }); // create user 

    if (user) { // add user to database
        res.status(201).json({
            _id: user._id,
            name: user.name, 
            email: user.email, 
            pic: user.pic,
            token: generateToken(user._id),
        })
    } else {
        res.status(400);
        throw new Error("failed to create user");
    }
});

const authUser = expressAsyncHandler(async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({email});

    if (user && await user.matchPassword(password)) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email, 
            pic: user.pic, 
            token: generateToken(user._id),
        })
    } else {
        res.status(401);
        throw new Error("invalid email or password");
    }
});

export { registerUser, authUser };