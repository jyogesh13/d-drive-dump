import { Schema, model, models } from 'mongoose';

const UserSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true, index: true },
    passwordHash: { type: String },
    role: { type: String, enum: ['admin', 'editor', 'user'], default: 'user', index: true },
    avatar: { type: String },
    bio: { type: String },
    subscriptionStatus: { type: String, enum: ['inactive', 'active', 'canceled'], default: 'inactive' }
  },
  { timestamps: true }
);

export const User = models.User || model('User', UserSchema);
