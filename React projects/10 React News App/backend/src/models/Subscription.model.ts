import mongoose, { Schema } from "mongoose";

const subscriptionSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    provider: { type: String, enum: ['stripe'], default: 'stripe' },
    customerId: { type: String, required: true, trim: true, index: true },
    subscriptionId: { type: String, required: true, trim: true, unique: true, index: true },
    priceId: { type: String, required: true, trim: true },
    plan: { type: String, enum: ['monthly', 'yearly'], required: true },
    status: { type: String, enum: ['active', 'trialing', 'past_due', 'canceled', 'expired'], default: 'active', index: true },
    currentPeriodStart: { type: Date },
    currentPeriodEnd: { type: Date },
    cancelAtPeriodEnd: { type: Boolean, default: false }
  },
  { timestamps: true }
);

export const Subscription = mongoose.models.Subscription || mongoose.model('Subscription', subscriptionSchema);
