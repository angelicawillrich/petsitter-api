import { Request, Response } from "express";
import { user } from "../services";


export async function getUserById(req: Request, res: Response) {
  try {
    const userId = req.params.id

    const userResult = await user.getUserById(userId)

    res.json({userResult})

  } catch (err) {
    console.error('ERROR:', err)
    res.json({})
  }
}

export async function getPetSitterById (req: Request, res: Response) {
  try {
    const petSitterId = req.params.id
    console.log({petSitterId})

    const result = await user.getPetSitterById(petSitterId)

    res.json({result})
  } catch (err) {
    console.error('ERROR:', err)
    res.json({})
  }
}