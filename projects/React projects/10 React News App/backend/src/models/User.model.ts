import mongoose, { Schema } from "mongoose";

const preferenceSchema = new Schema(
  {
    newsletter: { type: Boolean, default: true },
    categories: [{ type: Schema.Types.ObjectId, ref: "Category" }],
    theme: {
      type: String,
      enum: ["light", "dark", "system"],
      default: "system",
    },
  },
  { _id: false },
);

const socialLinksSchema = new Schema(
  {
    twitter: { type: String, trim: true },
    linkedin: { type: String, trim: true },
    website: { type: String, trim: true },
  },
  { _id: false },
);

const userSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    username: { type: String, trim: true, lowercase: true, sparse: true },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },
    passwordHash: { type: String, required: true, select: false },
    avatar: { type: String, trim: true },
    coverImage: { type: String, trim: true },
    bio: { type: String, trim: true, maxlength: 300 },
    role: {
      type: String,
      enum: ["user", "editor", "admin"],
      default: "user",
      index: true,
    },
    status: {
      type: String,
      enum: ["active", "blocked", "pending"],
      default: "active",
      index: true,
    },
    authProvider: {
      type: String,
      enum: ["credentials", "google", "github"],
      default: "credentials",
    },
    emailVerified: { type: Boolean, default: false },
    subscriptionStatus: {
      type: String,
      enum: ["free", "premium", "expired", "canceled"],
      default: "free",
      index: true,
    },
    preferences: { type: preferenceSchema, default: () => ({}) },
    socialLinks: { type: socialLinksSchema, default: () => ({}) },
    lastLoginAt: { type: Date },
  },
  { timestamps: true },
);

userSchema.index({ username: 1 }, { unique: true, sparse: true });

export const User = mongoose.models.User || mongoose.model("User", userSchema);
