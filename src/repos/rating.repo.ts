import { RatingModel } from "../models";
import { IRating, IUpdateRating } from "../services/rating.service";

export async function createRating (data: IRating) {
    const result = await RatingModel.create(data);
    return result;
}

export async function filterRating (filter: any) {
    const result = await RatingModel.find(filter)
    .exec();

    return result
}

export async function updateRating(ratingId: string, update: {description: string, rating: number, updatedAt: Date}) {
    const result = await RatingModel.findOneAndUpdate({_id: ratingId}, update);
    return result
}