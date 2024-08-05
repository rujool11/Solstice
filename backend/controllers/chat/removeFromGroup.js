import expressAsyncHandler from "express-async-handler";
import Chat from "../../models/chatModel.js";

const removeFromGroup = expressAsyncHandler( async (req, res) => {
    const { chatId, userId } = req.body;
    const removedFromGroup = await Chat.findByIdAndUpdate(
        chatId,
        {
            $pull: {users: userId},
        },
        { new: true }
    )
    .populate("users", "-password")
    .populate("groupAdmin", "-password");
    
    if (!removedFromGroup) {
        res.status(404);
        throw new Error("User not found");
    } else {
        res.status(200).json(removedFromGroup);
    }
});

export default removeFromGroup;