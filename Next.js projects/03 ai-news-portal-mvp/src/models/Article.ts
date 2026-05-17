import { Schema, model, models } from 'mongoose';

const ArticleSchema = new Schema(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true, index: true },
    excerpt: { type: String, required: true },
    content: { type: String, required: true },
    coverImage: { type: String },
    categoryId: { type: Schema.Types.ObjectId, ref: 'Category', index: true },
    authorId: { type: Schema.Types.ObjectId, ref: 'User', index: true },
    status: { type: String, enum: ['draft', 'review', 'published'], default: 'draft', index: true },
    visibility: { type: String, enum: ['free', 'premium'], default: 'free' },
    isTrending: { type: Boolean, default: false },
    isBreaking: { type: Boolean, default: false },
    publishedAt: { type: Date, index: true }
  },
  { timestamps: true }
);

export const Article = models.Article || model('Article', ArticleSchema);
