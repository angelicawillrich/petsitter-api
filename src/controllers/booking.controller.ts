import { NextFunction, Request, Response } from "express";
import { bookingService } from "../services";
import { MissingRequiredParams } from "../middlewares/errors/MissingRequiredParams";
import { IBookingData } from "../services/booking.service";
import { isValidObjectId } from "mongoose";
import { InvalidId } from "../middlewares/errors/InvalidId";

export async function createBooking (req: Request, res: Response, next: NextFunction) {
    try {
      if (!req.body.petSitterId || !req.body.userId || !req.body.initialDate || !req.body.initialTime || !req.body.finalDate || !req.body.finalTime || !req.body.service) {
        throw new MissingRequiredParams()
      }

      if (!isValidObjectId(req.body.userId) || !isValidObjectId(req.body.petSitterId)) {
        throw new InvalidId()
      }

      const data: IBookingData = req.body;

      const updatedData = {...data, status: 'pending'}

      const result = await bookingService.createBooking(updatedData)
  
      res.json({result})
    } catch (err) {
      next(err);
    }
  }

  export async function updateBookingStatus (req: Request, res: Response, next: NextFunction) {
    try {
      if (!req.body.bookingId || !req.body.status) {
        throw new MissingRequiredParams()
      }

      if (!isValidObjectId(req.body.bookingId)) {
        throw new InvalidId()
      }
      const bookingId = req.body.bookingId;
      const update = {
          status: req.body.status,
      };
        
    
      const result = await bookingService.updateBookingStatus(bookingId, update)
  
      res.json({result})
    } catch (err) {
      next(err);
    }
  }

  export async function filterBooking (req: Request, res: Response, next: NextFunction) {
    try {
      if (!req.body.filter) {
        throw new MissingRequiredParams()
      }
      
      const filter = Object.fromEntries(new URLSearchParams(req.params.filter))
      const result = await bookingService.filterBooking(filter)
  
      res.json({result})
    } catch (err) {
      next(err);
    }
  }