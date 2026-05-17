import mongoose, { Schema } from "mongoose";

const mediaSchema = new Schema(
  {
    type: { type: String, enum: ['image', 'video'], required: true, index: true },
    url: { type: String, required: true, trim: true },
    publicId: { type: String, trim: true },
    fileName: { type: String, required: true, trim: true },
    mimeType: { type: String, trim: true },
    size: { type: Number },
    width: { type: Number },
    height: { type: Number },
    duration: { type: Number },
    altText: { type: String, trim: true },
    folder: { type: String, trim: true },
    uploadedBy: { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    relatedArticleId: { type: Schema.Types.ObjectId, ref: 'Article', index: true },
    tags: [{ type: String, trim: true }]
  },
  { timestamps: true }
);

export const Media = mongoose.models.Media || mongoose.model('Media', mediaSchema);
