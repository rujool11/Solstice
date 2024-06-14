import mongoose from "mongoose";

const chatModel = mongoose.Schema(
  {
    chatName: { type: String, trim: true },

    isGroupChat: { type: Boolean, default: false },

    users: [
      {
        type: mongoose.Schema.types.ObjectId, // id to that user
        ref: "User", // reference to user model
      },
    ],

    latestMessage: {
      type: mongoose.Schema.types.ObjectId, // id to that message
      ref: "Message",
    },

    groupAdmin: {
      type: mongoose.Schema.types.ObjectId, // id to that user
      ref: "User", // reference to user model
    },
  },
  {
    timestamps: true,
  }
);

const Chat = mongoose.model("Chat", chatModel);

export default Chat;
