import expressAsyncHandler from "express-async-handler";
import Chat from "../../models/chatModel.js";
import User from "../../models/userModel.js";

const fetchChats = expressAsyncHandler( async (req, res) => {
    try {
        // find all chats where user exists
        let result = await Chat.find({users: {$elemMatch: {$eq: {_id: req.user._id}}}})
            .populate("users", "-password")
            .populate("groupAdmin", "-password")
            .populate("latestMessage")
            .sort({ updatedAt: -1}); // sort from new to old

        result = await User.populate(result, {
            path: "latestMessage.sender",
            select: "name pic email",
        }); // populate user inside result, that is the latestMessage sender

        res.status(200).send(result);

    } catch (error) {

        res.status(400);
        throw new Error(error.message);
    }
});

export default fetchChats;