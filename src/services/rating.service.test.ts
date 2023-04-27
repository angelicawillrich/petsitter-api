import { TransactionFailed } from '../middlewares/errors/TransactionFailed';
import { RatingRepo } from '../repos'
import { ratingService } from '../services'
jest.mock('../models')

describe('rating services', () => {
  it("should create a rating", async () => {
    const data = 
    {
        "reviewerId": "644694b376ab546264e82f82",
        "reviewedId": "644694b376ab546264e82f86",
        "rating": 3,
        "description": "Está muito caro",
        "reviewedByPetSitter": false
    };
    const mockResponse = {
        _id: '1',
    };

    RatingRepo.createRating = jest.fn().mockResolvedValue(mockResponse);

    const result = await ratingService.createRating(data);

    expect(result).toEqual(mockResponse);

  });

  it("should throw an error if one or more params are missing", async () => {
    const data = 
    {
        "reviewerId": "644694b376ab546264e82f82",
        "reviewedId": "644694b376ab546264e82f86",
        "rating": 3,
        "description": "",
        "reviewedByPetSitter": false
    };
    const mockResponse = null;

    RatingRepo.createRating = jest.fn().mockResolvedValue(mockResponse);

    await expect(ratingService.createRating(data)).rejects.toThrow(TransactionFailed);
  });
});