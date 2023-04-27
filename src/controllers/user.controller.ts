import { NextFunction, Request, Response } from "express";
import { userService } from "../services";
import { MissingRequiredParams } from "../middlewares/errors/MissingRequiredParams";


export async function getUserById(req: Request, res: Response, next: NextFunction) {
  try {
    if (!req.params.id) {
      throw new MissingRequiredParams()
    }

    const userId = req.params.id

    const userResult = await userService.getUserById(userId)

    res.json({userResult})

  } catch (err) {
    console.error('ERROR:', err)
    next(err);
  }
}

export async function getPetSitterById (req: Request, res: Response, next: NextFunction) {
  try {
    if (!req.params.id) {
      throw new MissingRequiredParams()
    }

    const petSitterId = req.params.id

    const result = await userService.getPetSitterById(petSitterId)
    res.json({result})
  } catch (err) {
    console.error('ERROR:', err)
    next(err);
  }
}

export async function login (req: Request, res: Response, next: NextFunction) {
  try {
    if (!req.body.email || !req.body.password) {
      throw new MissingRequiredParams()
    }

    const email = req.body.email
    const password = req.body.password
    const result = await userService.login(email, password)
    res.json(result)
  } catch (err) {
    console.error('ERROR:', err)
    next(err);
  }
}

export async function fetchPetSitters (req: Request, res: Response, next: NextFunction) {
  try {
    const result = await userService.fetchPetSitters()

    res.json({result})
  } catch (err) {
    console.error('ERROR:', err)
    next(err);
  }
}

export async function createUser (req: Request, res: Response, next: NextFunction) {
  try {
    if (!req.body.email || !req.body.password) {
      throw new MissingRequiredParams()
    }

    const email = req.body.email
    const password = req.body.password

    const result = await userService.createUser(email, password)

    res.json({result})
  } catch (err) {
    console.error('ERROR:', err)
    next(err);
  }
}

export async function updatePersonalInfo (req: Request, res: Response, next: NextFunction) {
  try {
    if (!req.body.userId || !req.body.name || !req.body.address || !req.body.city || !req.body.state || !req.body.phone) {
      throw new MissingRequiredParams()
    }

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

    const result = await userService.updateUser(userId, update)

    res.json({result})
  } catch (err) {
    console.error('ERROR:', err)
    next(err);
  }
}

export async function updatePets (req: Request, res: Response, next: NextFunction) {
  if (!req.body.userId || !req.body.pets) {
    throw new MissingRequiredParams()
  }

  try {
    const userId = req.body.userId;

    const update = {
      pets: req.body.pets
    };

    const result = await userService.updateUser(userId, update)

    res.json({result})
  } catch (err) {
    console.error('ERROR:', err)
    next(err);
  }
}

export async function updatePetSitter (req: Request, res: Response, next: NextFunction) {
  try {
    if (!req.body.userId || !req.body.petSitterInfo) {
      throw new MissingRequiredParams()
    }

    const userId = req.body.userId;

    const update = {
      petSitterInfo: req.body.petSitterInfo,
      isPetSitter: true
    };

    const result = await userService.updateUser(userId, update)

    res.json({result})
  } catch (err) {
    console.error('ERROR:', err)
    next(err);
  }
}

export async function updatePetSitterAvailableDates (req: Request, res: Response, next: NextFunction) {
  try {
    if (!req.body.userId || !req.body.availableDates) {
      throw new MissingRequiredParams()
    }
    
    const userId = req.body.userId;

    const update = {
      availableDates: req.body.availableDates,
    };

    const result = await userService.updateUser(userId, update)

    res.json({result})
  } catch (err) {
    console.error('ERROR:', err)
    next(err);
  }
}