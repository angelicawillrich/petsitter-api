import { NextFunction, Request, Response } from "express";
import { ratingService } from "../services";
import { MissingRequiredParams } from "../middlewares/errors/MissingRequiredParams";
import { isValidObjectId } from "mongoose";
import { InvalidId } from "../middlewares/errors/InvalidId";

export async function createRating (req: Request, res: Response, next: NextFunction) {
    try {
      if (!req.body.description || !req.body.rating || req.body.reviewedByPetSitter === undefined || !req.body.reviewedId || !req.body.reviewerId || !req.body.createdAt) {
        throw new MissingRequiredParams()
      }

      if (!isValidObjectId(req.body.reviewedId) || !isValidObjectId(req.body.reviewerId)) {
        throw new InvalidId()
      }

      const data = req.body;
  
      const result = await ratingService.createRating(data)
  
      res.json({result})
    } catch (err) {
      console.error('ERROR:', err)
      next(err);
    }
  }

  export async function filterRating (req: Request, res: Response, next: NextFunction) {
    try {
      if (!req.body.filter) {
        throw new MissingRequiredParams()
      }

      const filter = Object.fromEntries(new URLSearchParams(req.params.filter))
      const result = await ratingService.filterRating(filter)
  
      res.json({result})
    } catch (err) {
      console.error('ERROR:', err)
      next(err);
    }
  }

  export async function updateRating (req: Request, res: Response, next: NextFunction) {
    try {
      if (!req.body._id || !req.body.rating || !req.body.description) {
        throw new MissingRequiredParams()
      }
      if (!isValidObjectId(req.body._id)) {
        throw new InvalidId()
      }

      const ratingId = req.body._id
      const update = {
        description: req.body.description,
        rating: req.body.rating,
        updatedAt: new Date()
      }
  
      const result = await ratingService.updateRating(ratingId, update)
  
      res.json({result})
    } catch (err) {
      console.error('ERROR:', err)
      next(err);
    }
  }