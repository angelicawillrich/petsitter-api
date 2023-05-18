import { TransactionFailed } from "../middlewares/errors/TransactionFailed";
import { BookingRepo, UserRepo } from "../repos";

export interface IBookingData {
    petSitterId: string;
    userId: string;
    initialDate: Date;
    finalDate: Date;
    initialTime: string;
    finalTime: string;
    service: string;
    status?: string;
}

export interface IBookingStatus {
    status: string;
}

export async function createBooking (data: IBookingData) {
    try {
        const userId = data.userId
        const petSitterId = data.petSitterId

        const createBookingResult = await BookingRepo.createBooking(data)
        const bookingId = createBookingResult._id;
        
        await UserRepo.updateUserBooking(userId, bookingId);
        await UserRepo.updateUserBooking(petSitterId, bookingId);

        return createBookingResult;
    } catch (error) {
        throw new TransactionFailed();
    }
}

export async function updateBookingStatus (bookingId: string, update: IBookingStatus) {
    const updateBookingResult = await BookingRepo.updateBookingStatus(bookingId, update);
    return updateBookingResult;
}

export async function filterBooking(filter: any) {
    const result = await BookingRepo.filterBooking(filter);

    return result
}