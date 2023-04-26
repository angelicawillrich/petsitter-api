import { transactionFailedError } from "../middlewares/errors";
import { UserModel, RatingModel, BookingModel } from "../models";

interface IBookingData {
    petSitterId: string;
    userId: string;
    initialDate: Date;
    finalDate: Date;
    initialTime: string;
    finalTime: string;
    status: string;
}

interface IBookingStatus {
    status: string;
}

export async function createBooking(data: IBookingData) {
    try {
        const userId = data.userId
        const petSitterId = data.petSitterId

        const createBookingResult = await BookingModel.create(data);
        await UserModel.findOneAndUpdate(
            { _id: petSitterId }, 
            { $push: { bookings: createBookingResult._id } },
        );
        await UserModel.findOneAndUpdate(
            { _id: userId }, 
            { $push: { bookings: createBookingResult._id } },
        );

        return createBookingResult;
    } catch (error) {
        console.error('Error:', error)
        throw transactionFailedError;
    }
}

export async function updateBookingStatus(bookingId: string, update: IBookingStatus) {
    const updateBookingResult = await BookingModel.findOneAndUpdate({ _id: bookingId }, update);
    return updateBookingResult;
}