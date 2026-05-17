import mongoose, { Schema } from "mongoose";

const newsletterPreferenceSchema = new Schema(
  {
    daily: { type: Boolean, default: false },
    weekly: { type: Boolean, default: true },
    breaking: { type: Boolean, default: true },
    categories: [{ type: Schema.Types.ObjectId, ref: 'Category' }]
  },
  { _id: false }
);

const newsletterSubscriberSchema = new Schema(
  {
    email: { type: String, required: true, unique: true, lowercase: true, trim: true, index: true },
    userId: { type: Schema.Types.ObjectId, ref: 'User', index: true },
    status: { type: String, enum: ['subscribed', 'unsubscribed', 'bounced'], default: 'subscribed', index: true },
    source: { type: String, trim: true },
    preferences: { type: newsletterPreferenceSchema, default: () => ({}) },
    subscribedAt: { type: Date, default: Date.now },
    unsubscribedAt: { type: Date }
  },
  { timestamps: true }
);

export const NewsletterSubscriber = mongoose.models.NewsletterSubscriber || mongoose.model('NewsletterSubscriber', newsletterSubscriberSchema);
