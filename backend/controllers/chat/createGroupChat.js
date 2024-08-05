import expressAsyncHandler from "express-async-handler";
import Chat from "../../models/chatModel.js";

const createGroupChat = expressAsyncHandler( async (req, res) => {
    if (!req.body.users || !req.body.name) {
        return res.status(400).send({message: "All fields should be filled"});
    } 

    const users = JSON.parse(req.body.users); // sent after stringify by frontend
    if (users.length < 2) {
        return res.status(400).send({message: "Group chat must have at least 3 users"});
    }

    users.push(req.user);
    try {
        const groupChat = await Chat.create({
            chatName: req.body.name,
            users: users,
            isGroupChat: true,
            groupAdmin: req.user,
        });

        const fullGroupChat = await Chat.findOne({_id: groupChat._id})
                                  . populate("users", "-passwprd")
                                  . populate("groupAdmin", "-password"); 

        res.status(200).json(fullGroupChat);
    } catch (error) {
        res.status(400);
        throw new Error(error.message);
    }
});

export default createGroupChat;