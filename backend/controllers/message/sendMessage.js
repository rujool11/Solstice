import expressAsyncHandler from "express-async-handler";
import Message from "../../models/messageModel.js";
import User from "../../models/userModel.js";
import Chat from "../../models/chatModel.js";

const sendMessage = expressAsyncHandler(async (req, res) => {
    const { content, chatId } = req.body;
    // sender we get from protect middleware

    if (!content || !chatId) {
        console.log("Invalid data passed");
        return res.sendStatus(400);
    } 

    let newMessage = {
        sender: req.user._id,
        content: content,
        chat: chatId,
    };

    try {
        let message = await Message.create(newMessage);
        
        message = await message.populate("sender", "name pic");
        message = await message.populate("chat");
        message = await User.populate(message, {
            path: "chat.users",
            select: "name pic email",
        });

        await Chat.findByIdAndUpdate(req.body.chatId, {
            latestMessage: message,
        });

        res.json(message);

    } catch (error) {
       res.status(400);
       throw new Error(error.message); 
    }

})

export default sendMessage;