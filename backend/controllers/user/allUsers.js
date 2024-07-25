import expressAsyncHandler from "express-async-handler";
import User from "../../models/userModel.js";

// /api/user/?search=x -> specify params in get request without post, known as query
const allUsers = expressAsyncHandler(async (req, res) => {
    const keyword = req.query.search ? {
        $or: [
            {name: {$regex: req.query.search, $options: 'i'} },
            {email: {$regex: req.query.search, $options: 'i'}},  
        ]
    } : {};

    const users = await User.find(keyword).find({_id: {$ne: req.user._id}});
    res.send(users);
});

export default allUsers;