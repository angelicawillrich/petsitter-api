import { transactionFailedError } from "../middlewares/errors";
import { UserModel, RatingModel, BookingModel } from "../models";

interface IRating {
    reviewerId: string;
    reviewedId: string;
    rating: number;
    description: string;
    reviewedByPetSitter: boolean;
}

export async function createRating(data: IRating) {
    try {
        const reviewedId = data.reviewedId

        const createRatingResult = await RatingModel.create(data);
        await UserModel.findOneAndUpdate(
            { _id: reviewedId }, 
            { $push: { ratingsReceived: createRatingResult._id } },
        );

        return createRatingResult;
    } catch (error) {
        console.error('Error:', error)
        throw transactionFailedError;
    }
}
