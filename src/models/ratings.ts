import mongoose, { Types } from 'mongoose';

export interface IRating extends Document {
  reviewerId: Types.ObjectId;
  reviewedId: Types.ObjectId;
  rating: number;
  description: string;
  reviewedByPetSitter: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export const RatingSchema = new mongoose.Schema<IRating>({
    reviewerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    reviewedId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    rating: {type: Number, required: true},
    description: {type: String, required: true},
    reviewedByPetSitter: {type: Boolean, required: true},
    createdAt: {type: Date},
    updatedAt: {type: Date}
  });
