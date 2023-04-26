import { NextFunction, Request, Response } from "express";
import { rating } from "../services";

export async function createRating (req: Request, res: Response, next: NextFunction) {
    try {
      const data = req.body;
  
      const result = await rating.createRating(data)
  
      res.json({result})
    } catch (err) {
      console.error('ERROR:', err)
      next(err);
    }
  }