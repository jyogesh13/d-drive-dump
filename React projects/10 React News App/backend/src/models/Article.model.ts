import mongoose, { Schema } from "mongoose";

const statsSchema = new Schema(
  {
    views: { type: Number, default: 0 },
    shares: { type: Number, default: 0 },
    likes: { type: Number, default: 0 },
    comments: { type: Number, default: 0 }
  },
  { _id: false }
);

const seoSchema = new Schema(
  {
    metaTitle: { type: String, trim: true },
    metaDescription: { type: String, trim: true },
    metaKeywords: [{ type: String, trim: true }],
    canonicalUrl: { type: String, trim: true },
    ogImage: { type: String, trim: true }
  },
  { _id: false }
);

const aiMetaSchema = new Schema(
  {
    prompt: { type: String, trim: true },
    summary: { type: String, trim: true },
    model: { type: String, trim: true }
  },
  { _id: false }
);

const articleSchema = new Schema(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true, trim: true, index: true },
    excerpt: { type: String, required: true, trim: true },
    content: { type: String, required: true },
    contentBlocks: [{ type: Schema.Types.Mixed }],
    featuredImage: { type: String, trim: true },
    gallery: [{ type: String, trim: true }],
    videoUrl: { type: String, trim: true },
    authorId: { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    editorId: { type: Schema.Types.ObjectId, ref: 'User', index: true },
    categoryId: { type: Schema.Types.ObjectId, ref: 'Category', required: true, index: true },
    subcategoryId: { type: Schema.Types.ObjectId, ref: 'Subcategory', index: true },
    tagIds: [{ type: Schema.Types.ObjectId, ref: 'Tag' }],
    status: { type: String, enum: ['draft', 'review', 'scheduled', 'published', 'archived'], default: 'draft', index: true },
    visibility: { type: String, enum: ['free', 'premium'], default: 'free', index: true },
    sourceType: { type: String, enum: ['manual', 'ai-assisted', 'ai-generated'], default: 'manual' },
    isBreaking: { type: Boolean, default: false, index: true },
    isTrending: { type: Boolean, default: false, index: true },
    isMissed: { type: Boolean, default: false, index: true },
    allowComments: { type: Boolean, default: true },
    publishedAt: { type: Date, index: true },
    scheduledAt: { type: Date, index: true },
    readTime: { type: Number },
    stats: { type: statsSchema, default: () => ({}) },
    seo: { type: seoSchema, default: () => ({}) },
    aiMeta: { type: aiMetaSchema, default: () => ({}) }
  },
  { timestamps: true }
);

articleSchema.index({ status: 1, publishedAt: -1 });
articleSchema.index({ categoryId: 1, publishedAt: -1 });
articleSchema.index({ subcategoryId: 1, publishedAt: -1 });
articleSchema.index({ isTrending: 1, publishedAt: -1 });
articleSchema.index({ visibility: 1, status: 1 });
articleSchema.index({ title: 'text', excerpt: 'text', content: 'text' });

export const Article = mongoose.models.Article || mongoose.model('Article', articleSchema);
