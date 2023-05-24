import { NextFunction, Request, Response } from "express";
import { isValidObjectId } from "mongoose";
import { v4 as uuidv4 } from 'uuid';
import { MissingRequiredParams } from "../middlewares/errors/MissingRequiredParams";
import { InvalidEmail } from "../middlewares/errors/InvalidEmail";
import { NotFoundError } from "../middlewares/errors/NotFoundError";
import { regex, saveBase64ImageToLocalFolder } from "../utils/utils";
import { IPet } from "../models/users";
import { InvalidId } from "../middlewares/errors/InvalidId";
import { userService } from "../services";
import { Sessions } from "../Sessions";


export async function verifyToken(req: Request, res: Response, next: NextFunction) {
  try {
    const sessionId = req.headers.authorization?.replace('Bearer ', '');
    const session = Sessions.getInstance().getSessionById(sessionId)
    const userId = session.user
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

    if (!isValidObjectId(req.params.id)) {
      throw new InvalidId()
    }

    const userId = req.params.id
    const userResult = await userService.getUserById(userId)
    res.json({userResult})
  } catch (err) {
    next(err);
  }
}

export async function getPetSitterById (req: Request, res: Response, next: NextFunction) {
  try {
    if (!req.params.id) {
      throw new MissingRequiredParams()
    }

    if (!isValidObjectId(req.params.id)) {
      throw new InvalidId()
    }

    const petSitterId = req.params.id

    const result = await userService.getPetSitterById(petSitterId)
    res.json({result})
  } catch (err) {
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
      const expiresAt = Date.now() + (24 * 60 * 60 * 1000)
      const sessionId = Sessions.getInstance().addSession({ user: String(loginResult[0]._id), expiresAt})

      res.set("Authorization", `Bearer ${sessionId}`);
      const result = {user: loginResult, token: sessionId}
      res.json(result)
    }
  } catch (err) {
    next(err);
  }
}

export async function logout (req: Request, res: Response, next: NextFunction) {
  try {  
    if (!req.headers.authorization) {
      throw new MissingRequiredParams();
    }
    const sessionId = req.headers.authorization?.replace('Bearer ', '');
    const session = Sessions.getInstance().getSessionById(sessionId)
    if (!session) {
      throw new NotFoundError();
    }
    Sessions.getInstance().deleteSessionById(sessionId)
    res.json(true)

  } catch (err) {
    next(err);
  }
}

export async function fetchPetSitters (req: Request, res: Response, next: NextFunction) {
  try {
    const result = await userService.fetchPetSitters()

    res.json({result})
  } catch (err) {
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
    next(err);
  }
}

export async function updateProfile (req: Request, res: Response, next: NextFunction) {
  try {
    if (!req.body.userId || !req.body.name || !req.body.address || !req.body.cityId || !req.body.cityName || !req.body.stateId || !req.body.stateName || !req.body.phone) {
      throw new MissingRequiredParams()
    }
    if (!isValidObjectId(req.body.userId)) {
      throw new InvalidId()
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
      cityId: req.body.cityId,
      cityName: req.body.cityName,
      stateId: req.body.stateId,
      stateName: req.body.stateName,
      country: req.body.country || "BR",
      phone: req.body.phone,
      profilePicture: url
    };

    const result = await userService.updateUser(userId, update)

    res.json({result})
  } catch (err) {
    next(err);
  }
}

export async function updatePets (req: Request, res: Response, next: NextFunction) {
  if (!req.body.userId || !req.body.pets) {
    throw new MissingRequiredParams()
  }
  if (!isValidObjectId(req.body.userId)) {
    throw new InvalidId()
  }

  try {
    const updatedPets = await Promise.all(req.body.pets.map(async (pet: IPet): Promise<IPet> => {
      let url = null
      if (pet.picture) {
        if (pet.picture.split('/')[1] === "images") {
          url = pet.picture
        } else {
          const userId = req.body.userId
          const base64Image = pet.picture
          const filename = uuidv4().split('-').join('')
          url = await saveBase64ImageToLocalFolder(base64Image, filename, userId, 'pets')
        }
      }
      return {...pet, picture: url}
    }))

    const userId = req.body.userId;

    const update = {
      pets: updatedPets
    };

    const result = await userService.updateUser(userId, update)

    res.json({result})
  } catch (err) {
    next(err);
  }
}

export async function addPhotoAlbum (req: Request, res: Response, next: NextFunction) {
  try {
    if (!req.body.userId || !req.body.photo) {
      throw new MissingRequiredParams()
    }
    if (!isValidObjectId(req.body.userId)) {
      throw new InvalidId()
    }

    const userId = req.body.userId
    const base64Image = req.body.photo
    const filename = uuidv4().split('-').join('')
    const url = await saveBase64ImageToLocalFolder(base64Image, filename, userId, 'album')
    
    const addData = {
      filename: url,
      date: Date.now(),
    };

    const result = await userService.addPhotoAlbum(userId, addData)

    res.json({result})

  } catch (err) {
    next(err);
  }
}

export async function deletePhotoAlbum (req: Request, res: Response, next: NextFunction) {
  try {
    const deleteDataParams = Object.fromEntries(new URLSearchParams(req.params.deleteDataParams))
    if (!deleteDataParams.userId || !deleteDataParams.photoId) {
      throw new MissingRequiredParams()
    }
    if (!isValidObjectId(deleteDataParams.userId || !isValidObjectId(deleteDataParams.photoId))) {
      throw new InvalidId()
    }

    const userId = deleteDataParams.userId
    const photoId = deleteDataParams.photoId

    const result = await userService.deletePhotoAlbum(userId, photoId)

    res.json({result})

  } catch (err) {
    next(err);
  }
}

export async function createPost (req: Request, res: Response, next: NextFunction) {
  try {
    if (!req.body.petSitterId || !req.body.filename) {
      throw new MissingRequiredParams()
    }

    if (!isValidObjectId(req.body.petSitterId)) {
      throw new InvalidId()
    }

    const petSitterId = req.body.petSitterId
    const base64Image = req.body.filename
    const filename = uuidv4().split('-').join('')
    const url = await saveBase64ImageToLocalFolder(base64Image, filename, petSitterId, 'posts')
    
    const addData = {
      filename: url,
      description: req.body.description,
      date: Date.now(),
    };

    const result = await userService.createPost(petSitterId, addData)

    res.json({result})

  } catch (err) {
    next(err);
  }
}

export async function deletePost (req: Request, res: Response, next: NextFunction) {
  try {
    const deleteDataParams = Object.fromEntries(new URLSearchParams(req.params.deleteDataParams))
    if (!deleteDataParams.userId || !deleteDataParams.postId) {
      throw new MissingRequiredParams()
    }
    if (!isValidObjectId(deleteDataParams.userId) || !isValidObjectId(deleteDataParams.postId)) {
      throw new InvalidId()
    }

    const userId = deleteDataParams.userId
    const postId = deleteDataParams.postId

    const result = await userService.deletePost(userId, postId)

    res.json({result})

  } catch (err) {
    next(err);
  }
}

export async function updatePetSitter (req: Request, res: Response, next: NextFunction) {
  try {
    if (!req.body.userId || !req.body.petSitterInfo) {
      throw new MissingRequiredParams()
    }
    if (!isValidObjectId(req.body.userId)) {
      throw new InvalidId()
    }

    const userId = req.body.userId;

    const update = {
      petSitterInfo: req.body.petSitterInfo,
      isPetSitter: true
    };

    const result = await userService.updateUser(userId, update)

    res.json({result})
  } catch (err) {
    next(err);
  }
}

export async function createAvailableDate (req: Request, res: Response, next: NextFunction) {
  try {
    if (!req.body.userId|| !req.body.availableDate) {
      throw new MissingRequiredParams()
    }
    if (!isValidObjectId(req.body.userId)) {
      throw new InvalidId()
    }
    
    const userId = req.body.userId;
    const availableDate = req.body.availableDate

    const result = await userService.createAvailableDate(userId, availableDate)

    res.json({result})
  } catch (err) {
    next(err);
  }
}

export async function updateAvailableDate (req: Request, res: Response, next: NextFunction) {
  try {
    if (!req.body.userId || !req.body.availableDateId || !req.body.availableDate) {
      throw new MissingRequiredParams()
    }
    if (!isValidObjectId(req.body.userId) || !isValidObjectId(req.body.availableDateId)) {
      throw new InvalidId()
    }

    const userId = req.body.userId;
    const availableDateId = req.body.availableDateId;
    const availableDate = req.body.availableDate

    const result = await userService.updateAvailableDate(userId, availableDateId, availableDate)

    res.json({result})
  } catch (err) {
    next(err);
  }
}

export async function deleteAvailableDate (req: Request, res: Response, next: NextFunction) {
  try {
    const availableDateParams = Object.fromEntries(new URLSearchParams(req.params.availableDateParams))

    if (!availableDateParams.userId || !availableDateParams.availableDateId) {
      throw new MissingRequiredParams()
    }
    if (!isValidObjectId(availableDateParams.userId) || !isValidObjectId(availableDateParams.availableDateId)) {
      throw new InvalidId()
    }
    
    const userId = availableDateParams.userId;
    const availableDateId = availableDateParams.availableDateId;
    const result = await userService.deleteAvailableDate(userId, availableDateId)

    res.json({result})
  } catch (err) {
    next(err);
  }
}

export async function filterPetSitters (req: Request, res: Response, next: NextFunction) {
  try {
    const filter = Object.fromEntries(new URLSearchParams(req.params.filter))
    const result = await userService.filterPetSitters(filter)

    res.json({result})
  } catch (err) {
    next(err);
  }
}