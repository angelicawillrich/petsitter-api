import { Request } from "express"
import { bookingController } from '.';
import { MissingRequiredParams } from "../middlewares/errors/MissingRequiredParams";
import { InvalidId } from "../middlewares/errors/InvalidId";

jest.mock('../models')

describe('booking controller', () => {
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
                userId: '1234',
            },
        };

        await expect(bookingController.createBooking(mockRequest, mockResponse, mockNext)).rejects.toThrow(MissingRequiredParams);
    });

    it("should throw an error when create a booking and id is invalid", async () => {
        mockRequest = {
            body: {
                userId: '1',
                petSitterId: '1',
                initialDate: '2023-05-22',
                finalDate: '2023-05-22',
                initialTime: '08:00',
                finalTime: '09:00',
                service: '1'
            },
        };

        await expect(bookingController.createBooking(mockRequest, mockResponse, mockNext)).rejects.toThrow(InvalidId);
    });

    it("should throw an error when updating a booking and there are missing params", async () => {
        mockRequest = {
            body: {
                bookingId: '1234',
                status: null
            },
        };

        await expect(bookingController.updateBookingStatus(mockRequest, mockResponse, mockNext)).rejects.toThrow(MissingRequiredParams);
    });

    it("should throw an error when creating booking and id is invalid", async () => {
        mockRequest = {
            body: {
                bookingId: '1',
                status: '2023-05-22',
            },
        };

        await expect(bookingController.updateBookingStatus(mockRequest, mockResponse, mockNext)).rejects.toThrow(InvalidId);
    });

    it("should throw an error when filtering booking and filter is missing", async () => {
        mockRequest = {
            body: {
                filter: null,
            },
        };

        await expect(bookingController.updateBookingStatus(mockRequest, mockResponse, mockNext)).rejects.toThrow(MissingRequiredParams);
    });
})