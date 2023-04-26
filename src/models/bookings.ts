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
      ref: 'User',
      required: true
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    initialDate: { type: Date, required: true },
    finalDate: { type: Date, required: true },
    initialTime: { type: String, required: true },
    finalTime: { type: String, required: true },
    status: { type: String, required: true }
  });
