import mongoose, { mongo } from "mongoose";

messageModel = mongoose.Schema(
  {
    sender: { type: mongoose.Schema.types.ObjectId, ref: "User" },

    content: { type: String, trim: true },

    chat: { type: mongoose.Schema.types.ObjectId, ref: "Chat" },
  },
  {
    timestamps: true,
  }
);

const Message = mongoose.model("Message", messageModel);

export default Message;
