import mongoose, { Types } from 'mongoose';

export interface IBooking extends Document {
  petSitterId: Types.ObjectId;
  userId: Types.ObjectId;
  initialDate: Date;
  finalDate: Date;
  initialTime: string;
  finalTime: string;
  status: string;
}

export const BookingSchema = new mongoose.Schema<IBooking>({
    petSitterId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    initialDate: Date,
    finalDate: Date,
    initialTime: String,
    finalTime: String,
    status: String
  });
