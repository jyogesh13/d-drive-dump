import mongoose, { Schema } from "mongoose";

const aiContentJobSchema = new Schema(
  {
    requestedBy: { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    articleId: { type: Schema.Types.ObjectId, ref: 'Article', index: true },
    type: { type: String, enum: ['headline', 'summary', 'rewrite', 'full-draft', 'seo-meta'], required: true, index: true },
    inputPrompt: { type: String, required: true },
    outputText: { type: String },
    status: { type: String, enum: ['queued', 'processing', 'completed', 'failed'], default: 'queued', index: true },
    provider: { type: String, trim: true },
    model: { type: String, trim: true },
    errorMessage: { type: String, trim: true }
  },
  { timestamps: true }
);

export const AIContentJob = mongoose.models.AIContentJob || mongoose.model('AIContentJob', aiContentJobSchema);
