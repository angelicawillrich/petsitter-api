import mongoose, { Document } from "mongoose";
import { BookingSchema, IBooking } from "./bookings";
import { IRating, RatingSchema } from "./ratings";
import { IUser, UserSchema } from "./users";

export const BookingModel = mongoose.model<IBooking & Document>('Booking', BookingSchema);

export const UserModel = mongoose.model<IUser & Document>('User', UserSchema);

export const RatingModel = mongoose.model<IRating & Document>('Rating', RatingSchema);
