import expressAsyncHandler from "express-async-handler";
import Chat from "../../models/chatModel.js"
import Message from "../../models/messageModel.js"
import User from "../../models/userModel.js"

const allMessages = expressAsyncHandler(async (req, res) => {
    try {
        // since chatId provided in parameters -> /:chatID
        const messages = await Message.find({chat: req.params.chatId})
                                        .populate("sender", "name pic email")
                                        .populate("chat");
        
        res.json(messages);

    } catch (error) {
        res.status(400);
        throw new Error(error.message);

    }
})

export default allMessages;