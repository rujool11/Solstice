import expressAsyncHandler from "express-async-handler";
import Chat from "../../models/chatModel.js";

const renameGroup = expressAsyncHandler( async (req, res) => {
    const {chatId, newChatName} = req.body;
    
    const updatedChat = await Chat.findByIdAndUpdate( // function finds and immediately update
        chatId,
        {
            chatName: newChatName,
        },
        {
            new: true, // will return updated chat instead of old
            useFindAndModify: false
        }
    )
    .populate("users", "-password")
    .populate("groupAdmin", "-password");

    if (!updatedChat) {
        res.status(404);
        throw new Error("Chat not found");
    } else {
        res.status(200).json(updatedChat);
    }
});

export default renameGroup;