import expressAsyncHandler from "express-async-handler";
import Chat from "../../models/chatModel.js";

const addToGroup = expressAsyncHandler( async (req, res) => {
    const { chatId, userId } = req.body;

    const addedToGroup = await Chat.findByIdAndUpdate(
        chatId,
        {
            $push: {users: userId},
        },
        { new: true},
    )
    .populate("users", "-password")
    .populate("groupAdmin", "-password");

    if (!addedToGroup) {
        res.status(404);
        throw new Error("Chat not found");
    } else {
        res.status(200).json(addedToGroup);
    }
});

export default addToGroup;