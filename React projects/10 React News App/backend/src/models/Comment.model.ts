import mongoose, { Schema } from "mongoose";

const commentSchema = new Schema(
  {
    articleId: { type: Schema.Types.ObjectId, ref: 'Article', required: true, index: true },
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    parentCommentId: { type: Schema.Types.ObjectId, ref: 'Comment', default: null, index: true },
    content: { type: String, required: true, trim: true },
    status: { type: String, enum: ['visible', 'hidden', 'flagged', 'deleted'], default: 'visible', index: true },
    likesCount: { type: Number, default: 0 },
    repliesCount: { type: Number, default: 0 }
  },
  { timestamps: true }
);

commentSchema.index({ articleId: 1, createdAt: -1 });

export const Comment = mongoose.models.Comment || mongoose.model('Comment', commentSchema);
