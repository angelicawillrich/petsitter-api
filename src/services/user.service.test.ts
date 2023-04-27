import { UserModel, RatingModel, BookingModel } from "../models";
import { userService } from '.';
import { Document, Model } from "mongoose";
import { UserRepo } from "../repos";

jest.mock('../models')

describe('getUserById', () => {
  it("should return user's details when getUserById is called with valid userId", async () => {

    const userId = '1';
    const mockResponse = {
        _id: '1',
        username: 'a@a.com',
        name: 'Angélica'
    };

    UserRepo.getUserById = jest.fn().mockResolvedValue(mockResponse);

    const result = await userService.getUserById(userId);

    expect(result).toEqual(mockResponse);

  });
})
