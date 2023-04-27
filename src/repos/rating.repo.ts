import { RatingModel } from "../models";
import { IRating } from "../services/rating.service";

export async function createRating (data: IRating) {
    const result = await RatingModel.create(data);
    return result;
}