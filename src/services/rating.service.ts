import { TransactionFailed } from "../middlewares/errors/TransactionFailed";
import { RatingRepo, UserRepo } from "../repos";

export interface IRating {
    reviewerId: string;
    reviewedId: string;
    rating: number;
    description: string;
    reviewedByPetSitter: boolean;
}

export interface IUpdateRating {
    rating: number
    description: string
    _id: string
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
        throw new TransactionFailed();
    }
}

export async function filterRating(filter: any) {
    const result = await RatingRepo.filterRating(filter);

    return result
}

export async function updateRating(ratingId: string, update: {description: string, rating: number, updatedAt: Date}) {
    const result = await RatingRepo.updateRating(ratingId, update);

    return result
}