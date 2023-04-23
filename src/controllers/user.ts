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
