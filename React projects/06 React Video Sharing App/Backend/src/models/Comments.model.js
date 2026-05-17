import mongoose, { Schema } from "mongoose";

const commentSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    videoId: {
      type: Schema.Types.ObjectId,
      ref: "Video",
    },
    desc: {
      type: String,
      rquired: true,
    },
  },
  { timestamps: true }
);

export const Comments = mongoose.model("Comments", commentSchema);
