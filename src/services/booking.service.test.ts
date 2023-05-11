import { bookingService } from ".";
import { TransactionFailed } from "../middlewares/errors/TransactionFailed";
import { BookingRepo } from "../repos";

jest.mock('../models')

describe('booking services', () => {
  it("should create a booking", async () => {
    const data = 
      {
        "userId": "644772ba683495eb79924be2",
        "petSitterId": "64476cd5dade90c92340029b",
        "initialDate": new Date(),
        "finalDate": new Date(),
        "initialTime": "09:00",
        "finalTime": "09:00",
        "status": "pending"
      };
    const mockResponse = {
        _id: '1',
    };

    BookingRepo.createBooking = jest.fn().mockResolvedValue(mockResponse);

    const result = await bookingService.createBooking(data);

    expect(result).toEqual(mockResponse);

  });

  it("should throw an error if one or more params are missing", async () => {
    const data = 
      {
        "userId": "644772ba683495eb79924be2",
        "petSitterId": "64476cd5dade90c92340029b",
        "initialDate": new Date(),
        "finalDate": new Date(),
        "initialTime": "09:00",
        "finalTime": "09:00",
        "status": ""
      };
    const mockResponse = null;

    BookingRepo.createBooking = jest.fn().mockResolvedValue(mockResponse);

    await expect(bookingService.createBooking(data)).rejects.toThrow(TransactionFailed);
  });

  it("should update a booking status", async () => {
    const data = { "status": "canceled" };
    const bookingId = "1"
    const mockResponse = {
        _id: '1',
    };

    BookingRepo.updateBookingStatus = jest.fn().mockResolvedValue(mockResponse);

    const result = await bookingService.updateBookingStatus(bookingId, data);

    expect(result).toEqual(mockResponse);

  });
});