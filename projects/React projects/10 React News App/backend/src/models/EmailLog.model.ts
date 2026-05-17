import mongoose, { Schema } from "mongoose";

const emailLogSchema = new Schema(
  {
    to: { type: String, required: true, trim: true, index: true },
    userId: { type: Schema.Types.ObjectId, ref: 'User', index: true },
    template: { type: String, required: true, trim: true },
    subject: { type: String, required: true, trim: true },
    status: { type: String, enum: ['queued', 'sent', 'failed'], default: 'queued', index: true },
    error: { type: String, trim: true },
    sentAt: { type: Date }
  },
  { timestamps: { createdAt: true, updatedAt: false } }
);

export const EmailLog = mongoose.models.EmailLog || mongoose.model('EmailLog', emailLogSchema);
