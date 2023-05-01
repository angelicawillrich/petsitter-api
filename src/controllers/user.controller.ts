import { NextFunction, Request, Response } from "express";
import { userService } from "../services";
import { MissingRequiredParams } from "../middlewares/errors/MissingRequiredParams";
import { InvalidEmail } from "../middlewares/errors/InvalidEmail";
import { v4 as uuidv4 } from 'uuid';
import { sessions } from "..";
import { NotFoundError } from "../middlewares/errors/NotFoundError";
import { saveBase64ImageToLocalFolder } from "../utils/utils";

const regex = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.(?:[a-zA-Z]{2}|[a-zA-Z]{3})$/

export async function verifyToken(req: Request, res: Response, next: NextFunction) {
  try {
    const sessionId = req.headers.authorization?.replace('Bearer ', '');
    const userId = sessions[sessionId].user
    const user = await userService.getUserById(userId)
    res.json({user})
  } catch (err) {
    next(err);
  }
}

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
    const loginResult = await userService.login(email, password)

    if (loginResult) {
      const sessionId = uuidv4();
      const expiresAt = Date.now() + (24 * 60 * 60 * 1000)
      sessions[sessionId] = { user: String(loginResult[0]._id), expiresAt};

      res.set("Authorization", `Bearer ${sessionId}`);
      const result = {user: loginResult, token: sessionId}
      res.json(result)
    }
  } catch (err) {
    console.error('ERROR:', err)
    next(err);
  }
}

export async function logout (req: Request, res: Response, next: NextFunction) {
  try {  
    if (!req.headers.authorization) {
      throw new MissingRequiredParams();
    }
    const sessionId = req.headers.authorization?.replace('Bearer ', '');
    if (!sessions[sessionId]) {
      throw new NotFoundError();
    }

    delete sessions[sessionId];
    res.json(true)

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
      throw new MissingRequiredParams();
    }

    const email = req.body.email
    const password = req.body.password

    // if email is not valid
    if (!regex.test(email)) {
      throw new InvalidEmail();
    }


    const result = await userService.createUser(email, password)

    res.json({result})
  } catch (err) {
    console.error('ERROR:', err)
    next(err);
  }
}

export async function updateProfile (req: Request, res: Response, next: NextFunction) {
  try {
    if (!req.body.userId || !req.body.name || !req.body.address || !req.body.city || !req.body.state || !req.body.phone) {
      throw new MissingRequiredParams()
    }
    let url = null
    if (req.body.profilePicture) {
      if (req.body.profilePicture.split('/')[1] === "images") {
        url = req.body.profilePicture
      } else {
        const userId = req.body.userId
        const base64Image = req.body.profilePicture
        const filename = uuidv4().split('-').join('')
        url = await saveBase64ImageToLocalFolder(base64Image, filename, userId, 'profile')
      }
    }
    
    const userId = req.body.userId;

    const update = {
      name: req.body.name,
      address: req.body.address,
      district: req.body.district,
      city: req.body.city,
      state: req.body.state,
      country: req.body.country || "BR",
      phone: req.body.phone,
      profilePicture: url
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