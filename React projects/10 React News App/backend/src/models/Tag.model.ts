import mongoose, { Schema } from "mongoose";

const tagSchema = new Schema(
  {
    name: { type: String, required: true, trim: true, unique: true },
    slug: { type: String, required: true, trim: true, lowercase: true, unique: true, index: true }
  },
  { timestamps: true }
);

export const Tag = mongoose.models.Tag || mongoose.model('Tag', tagSchema);
