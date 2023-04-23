import mongoose, { Types } from 'mongoose';

export interface IRating extends Document {
  reviewerId: Types.ObjectId;
  reviewedId: Types.ObjectId;
  rating: number;
  description: string;
  reviewedByPetSitter: boolean;
}

export const RatingSchema = new mongoose.Schema<IRating>({
    reviewerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    reviewedId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    rating: Number,
    description: String,
    reviewedByPetSitter: Boolean
  });
