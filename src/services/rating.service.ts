import { transactionFailedError } from "../middlewares/errors";
import { RatingRepo, UserRepo } from "../repos";

export interface IRating {
    reviewerId: string;
    reviewedId: string;
    rating: number;
    description: string;
    reviewedByPetSitter: boolean;
}

export async function createRating(data: IRating) {
    try {
        const reviewedId = data.reviewedId

        const createRatingResult = await RatingRepo.createRating(data);
        const ratingId = createRatingResult._id;
        await UserRepo.updateReviewedIdUserRating(reviewedId, ratingId)

        return createRatingResult;
    } catch (error) {
        console.error('Error:', error)
        throw transactionFailedError;
    }
}
