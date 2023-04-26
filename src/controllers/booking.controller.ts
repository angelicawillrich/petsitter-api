import { NextFunction, Request, Response } from "express";
import { booking } from "../services";

export async function createBooking (req: Request, res: Response, next: NextFunction) {
    try {
      const data = req.body;
  
      const result = await booking.createBooking(data)
  
      res.json({result})
    } catch (err) {
      console.error('ERROR:', err)
      next(err);
    }
  }

  export async function updateBookingStatus (req: Request, res: Response, next: NextFunction) {
    try {
        const bookingId = req.body.bookingId;
        const update = {
            status: req.body.status,
        };
    
        const result = await booking.updateBookingStatus(bookingId, update)
    
        res.json({result})
      } catch (err) {
        console.error('ERROR:', err)
        next(err);
      }
  }