import mongoose, { Schema } from "mongoose";

const seoSchema = new Schema(
  {
    title: { type: String, trim: true },
    description: { type: String, trim: true }
  },
  { _id: false }
);

const categorySchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true, trim: true, index: true },
    description: { type: String, trim: true },
    color: { type: String, trim: true },
    icon: { type: String, trim: true },
    image: { type: String, trim: true },
    isActive: { type: Boolean, default: true, index: true },
    sortOrder: { type: Number, default: 0, index: true },
    seo: { type: seoSchema, default: () => ({}) }
  },
  { timestamps: true }
);

export const Category = mongoose.models.Category || mongoose.model('Category', categorySchema);
