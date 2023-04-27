import { BookingModel } from "../models";
import { IBookingData, IBookingStatus } from "../services/booking.service";

export async function createBooking (data: IBookingData) {
    const createBookingResult = await BookingModel.create(data);
    return createBookingResult;
}

export async function updateBookingStatus (bookingId: string, update: IBookingStatus) {
    const updateBookingResult = await BookingModel.findOneAndUpdate({ _id: bookingId }, update);
    return updateBookingResult;
}