import mongoose, { Schema } from "mongoose";

const podcastOrLiveChannelSchema = new Schema(
  {
    type: { type: String, enum: ['podcast', 'live-tv'], required: true, index: true },
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, lowercase: true, trim: true, unique: true, index: true },
    description: { type: String, trim: true },
    thumbnail: { type: String, trim: true },
    streamUrl: { type: String, trim: true },
    episodeUrl: { type: String, trim: true },
    isLive: { type: Boolean, default: false },
    isActive: { type: Boolean, default: true, index: true },
    publishedAt: { type: Date, index: true }
  },
  { timestamps: true }
);

export const PodcastOrLiveChannel = mongoose.models.PodcastOrLiveChannel || mongoose.model('PodcastOrLiveChannel', podcastOrLiveChannelSchema);
