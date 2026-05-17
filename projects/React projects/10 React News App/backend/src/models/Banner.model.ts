import mongoose, { Schema } from "mongoose";

const bannerSchema = new Schema(
  {
    title: { type: String, required: true, trim: true },
    subtitle: { type: String, trim: true },
    image: { type: String, trim: true },
    link: { type: String, trim: true },
    position: { type: String, enum: ['home-top', 'home-middle', 'category-top', 'sidebar'], required: true, index: true },
    type: { type: String, enum: ['promo', 'breaking', 'subscription', 'internal'], default: 'promo' },
    isActive: { type: Boolean, default: true, index: true },
    startsAt: { type: Date, index: true },
    endsAt: { type: Date, index: true },
    createdBy: { type: Schema.Types.ObjectId, ref: 'User', required: true }
  },
  { timestamps: true }
);

bannerSchema.index({ position: 1, isActive: 1 });

export const Banner = mongoose.models.Banner || mongoose.model('Banner', bannerSchema);
