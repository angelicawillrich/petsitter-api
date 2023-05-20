import { Request } from "express";
import { ratingController } from '.';
import { MissingRequiredParams } from "../middlewares/errors/MissingRequiredParams";
import { isValidObjectId } from "mongoose";
import { InvalidId } from "../middlewares/errors/InvalidId";

jest.mock('../models')

describe('rating controller', () => {
    let mockRequest
    let mockResponse
    let mockNext

    beforeEach(() => {
        mockRequest = {
            body: {},
            params: {}
        } as Request

        mockResponse = {
            json: jest.fn(),
            status: jest.fn(),
        } as any

        mockNext = (error) => {
            throw error
        };
    })

    it("should throw an error when creating a booking and there are missing params", async () => {
        mockRequest = {
            body: {
                description: 'Super PetSitter',
            },
        };

        await expect(ratingController.createRating(mockRequest, mockResponse, mockNext)).rejects.toThrow(MissingRequiredParams);
    });

    it("should throw an error when creating a booking and there ids are invalid", async () => {
        mockRequest = {
            body: {
                description: 'Super PetSitter!',
                rating: 5,
                reviewedByPetSitter: false,
                reviewedId: '1',
                reviewerId: '1',
                createdAt: '2023-05-23'
            },
        };

        await expect(ratingController.createRating(mockRequest, mockResponse, mockNext)).rejects.toThrow(InvalidId);
    });

    it("should throw an error when filtering a booking and filter is missing", async () => {
        mockRequest = {
            params: {
                filter: null,
            },
        };

        await expect(ratingController.filterRating(mockRequest, mockResponse, mockNext)).rejects.toThrow(MissingRequiredParams);
    });

    it("should throw an error when updating a booking and params are missing", async () => {
        mockRequest = {
            body: {
                _id: null,
                rating: null,
                description: null
            },
        };

        await expect(ratingController.updateRating(mockRequest, mockResponse, mockNext)).rejects.toThrow(MissingRequiredParams);
    });

    it("should throw an error when updating a booking and params id is invalid", async () => {
        mockRequest = {
            body: {
                _id: '1',
                rating: 5,
                description: 'Super PetSitter'
            },
        };

        await expect(ratingController.updateRating(mockRequest, mockResponse, mockNext)).rejects.toThrow(InvalidId);
    });
})