import mongoose, {Schema} from "mongoose";

const watchHistorySchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    video: {
      type: Schema.Types.ObjectId,
      ref: "Video",
      required: true,
      index: true,
    },

    // how many times user watched this video (optional but useful)
    watchCount: {
      type: Number,
      default: 1,
      min: 1,
    },

    // last watch position in seconds (for resume feature)
    lastWatchedAtSeconds: {
      type: Number,
      default: 0,
      min: 0,
    },

    // last time this video was watched by the user
    lastWatchedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true, // adds createdAt & updatedAt
  }
);

// optional: ensure a user has at most one history entry per video
watchHistorySchema.index({ user: 1, video: 1 }, { unique: true });

export const WatchHistory = mongoose.model("WatchHistory", watchHistorySchema);

