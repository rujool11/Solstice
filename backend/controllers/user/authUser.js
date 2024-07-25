import expressAsyncHandler from "express-async-handler";
import User from "../../models/userModel.js";
import generateToken from "../../config/generateToken.js";

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

export default authUser;
