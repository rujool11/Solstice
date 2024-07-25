import expressAsyncHandler from "express-async-handler";
import Chat from "../../models/chatModel.js"
import User from "../../models/userModel.js";

const accessChats = expressAsyncHandler(async (req, res) =>{
    // get userId of user with whom logged in user wants to chat
    const { userId } = req.body;

    if (!userId) {
        throw new Error("UserID param not send with request");
        res.status(400);
    }

    let isChat = Chat.find({

        isGroupChat: false, // this is only for one-on-one chats
        $and: [
            {users: {$elemMatch: {$eq: req.user._id}}},
            {users: {$elemMatch: {$eq: userId}}},
        ], // users array should have both userId and _id of logged in user

    }).populate("users", "-password")
        .populate("latestMessage");

    // populate fills specified field with documents
    // here, users array will be filled with documents with the user info, and latestMessage 
    // will be filled with the latest message
    // populate can be used since users array and latestMessage contain reference to 
    // the users and latest message respectively

    isChat = await User.populate(isChat, {
        path: "latestMessage.sender",
        select: "name pic email",
    });

    if (isChat.length > 0) {
        res.send(isChat[0]); // since only one one-on-one chat can exist with these two users
    } else {
        let chatData = {
            chatName: "sender", 
            isGroupChat: false,
            users: [
                req.user._id,
                userId,
            ],
        };

        try {
            const createdChat = await Chat.create(chatData);
            const fullChat = await Chat.findOne({_id: createdChat._id}).populate("users", "-password");
            // created fullChat so that users array could be populated
            res.status(200).send(fullChat);
        } catch (error) {
            res.status(400);
            throw new Error(error.message);
        }
    }
});


export default accessChats;