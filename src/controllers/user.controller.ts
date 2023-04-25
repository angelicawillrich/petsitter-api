import { NextFunction, Request, Response } from "express";
import { user } from "../services";


export async function getUserById(req: Request, res: Response, next: NextFunction) {
  try {
    const userId = req.params.id

    const userResult = await user.getUserById(userId)

    res.json({userResult})

  } catch (err) {
    console.error('ERROR:', err)
    next(err);
  }
}

export async function getPetSitterById (req: Request, res: Response, next: NextFunction) {
  try {
    const petSitterId = req.params.id

    const result = await user.getPetSitterById(petSitterId)
    res.json({result})
  } catch (err) {
    console.error('ERROR:', err)
    next(err);
  }
}

export async function login (req: Request, res: Response, next: NextFunction) {
  try {
    const username = req.body.username
    const password = req.body.password

    const result = await user.login(username, password)
    if (!result.length) return res.json(false)
    res.json(true)
  } catch (err) {
    console.error('ERROR:', err)
    next(err);
  }
}

export async function fetchPetSitters (req: Request, res: Response, next: NextFunction) {
  try {
    const result = await user.fetchPetSitters()

    res.json({result})
  } catch (err) {
    console.error('ERROR:', err)
    next(err);
  }
}

export async function createUser (req: Request, res: Response, next: NextFunction) {
  try {
    const username = req.body.username
    const password = req.body.password

    const result = await user.createUser(username, password)

    res.json({result})
  } catch (err) {
    console.error('ERROR:', err)
    next(err);
  }
}

export async function updatePersonalInfo (req: Request, res: Response, next: NextFunction) {
  try {
    const userId = req.body.userId;

    const update = {
      name: req.body.name,
      addess: req.body.address,
      city: req.body.city,
      state: req.body.state,
      country: req.body.country || "BR",
      phone: req.body.phone,
      profilePicture: req.body.profilePicture
    };

    const result = await user.updatePersonalInfo(userId, update)

    res.json({result})
  } catch (err) {
    console.error('ERROR:', err)
    next(err);
  }
}