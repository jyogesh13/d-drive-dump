import mongoose, { Schema } from "mongoose";

const conversationSchema = new Schema(
  {
    user: {
      //   type: mongoose.Schema.Types.ObjectId,
      //   ref: "User",
      type: String,
      required: true,
      index: true,
    },

    title: {
      type: String,
      trim: true,
      default: "New conversation",
    },

    systemPrompt: {
      type: String,
      default: "You are a helpful assistant.",
    },

    lastMessageAt: {
      type: Date,
      default: Date.now,
      index: true,
    },
  },
  { timestamps: true },
);

export const Conversation = mongoose.model("Conversation", conversationSchema);
