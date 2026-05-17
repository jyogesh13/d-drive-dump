import mongoose, { Schema } from "mongoose";

const brandingSchema = new Schema(
  {
    siteName: { type: String, required: true, trim: true },
    logo: { type: String, trim: true },
    favicon: { type: String, trim: true },
    primaryColor: { type: String, trim: true }
  },
  { _id: false }
);

const seoDefaultsSchema = new Schema(
  {
    metaTitle: { type: String, trim: true },
    metaDescription: { type: String, trim: true },
    metaKeywords: [{ type: String, trim: true }]
  },
  { _id: false }
);

const socialLinksSchema = new Schema(
  {
    facebook: { type: String, trim: true },
    twitter: { type: String, trim: true },
    linkedin: { type: String, trim: true },
    youtube: { type: String, trim: true },
    instagram: { type: String, trim: true }
  },
  { _id: false }
);

const featuresSchema = new Schema(
  {
    commentsEnabled: { type: Boolean, default: true },
    newsletterEnabled: { type: Boolean, default: true },
    podcastEnabled: { type: Boolean, default: true },
    liveTvEnabled: { type: Boolean, default: true },
    premiumEnabled: { type: Boolean, default: true },
    aiContentEnabled: { type: Boolean, default: true }
  },
  { _id: false }
);

const contactSchema = new Schema(
  {
    supportEmail: { type: String, trim: true },
    newsletterEmail: { type: String, trim: true }
  },
  { _id: false }
);

const siteSettingSchema = new Schema(
  {
    branding: { type: brandingSchema, required: true },
    seoDefaults: { type: seoDefaultsSchema, default: () => ({}) },
    socialLinks: { type: socialLinksSchema, default: () => ({}) },
    features: { type: featuresSchema, default: () => ({}) },
    contact: { type: contactSchema, default: () => ({}) },
    updatedBy: { type: Schema.Types.ObjectId, ref: 'User' }
  },
  { timestamps: true }
);

export const SiteSetting = mongoose.models.SiteSetting || mongoose.model('SiteSetting', siteSettingSchema);
