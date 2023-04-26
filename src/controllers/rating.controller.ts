import { NextFunction, Request, Response } from "express";
import { ratingService } from "../services";

export async function createRating (req: Request, res: Response, next: NextFunction) {
    try {
      const data = req.body;
  
      const result = await ratingService.createRating(data)
  
      res.json({result})
    } catch (err) {
      console.error('ERROR:', err)
      next(err);
    }
  }