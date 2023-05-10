import { NextFunction, Request, Response } from "express";
import { userService } from "../services";
import { MissingRequiredParams } from "../middlewares/errors/MissingRequiredParams";
import { InvalidEmail } from "../middlewares/errors/InvalidEmail";
import { v4 as uuidv4 } from 'uuid';
import { sessions } from "..";
import { NotFoundError } from "../middlewares/errors/NotFoundError";
import { saveBase64ImageToLocalFolder } from "../utils/utils";
import { IPet } from "../models/users";

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
    if (!req.body.userId || !req.body.name || !req.body.address || !req.body.cityId || !req.body.cityName || !req.body.stateId || !req.body.stateName || !req.body.phone) {
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
    console.error('ERROR:', err)
    next(err);
  }
}

export async function updatePets (req: Request, res: Response, next: NextFunction) {
  if (!req.body.userId || !req.body.pets) {
    throw new MissingRequiredParams()
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
    console.error('ERROR:', err)
    next(err);
  }
}

export async function addPhotoAlbum (req: Request, res: Response, next: NextFunction) {
  try {
    if (!req.body.userId || !req.body.photo) {
      throw new MissingRequiredParams()
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
    console.error('ERROR:', err)
    next(err);
  }
}

export async function deletePhotoAlbum (req: Request, res: Response, next: NextFunction) {
  try {
    if (!req.body.userId || !req.body.album) {
      throw new MissingRequiredParams()
    }

    const userId = req.body.userId
    
    const update = {
      album: req.body.album
    }

    const result = await userService.deletePhotoAlbum(userId, update)

    res.json({result})

  } catch (err) {
    console.error('ERROR:', err)
    next(err);
  }
}

export async function createPost (req: Request, res: Response, next: NextFunction) {
  try {
    if (!req.body.petSitterId || !req.body.filename) {
      throw new MissingRequiredParams()
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
    console.error('ERROR:', err)
    next(err);
  }
}

export async function deletePost (req: Request, res: Response, next: NextFunction) {
  try {
    if (!req.body.petSitterId || !req.body.posts) {
      throw new MissingRequiredParams()
    }

    const petSitterId = req.body.petSitterId
    
    const update = {
      posts: req.body.posts
    }

    const result = await userService.deletePost(petSitterId, update)

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

export async function filterPetSitters (req: Request, res: Response, next: NextFunction) {
  try {
    const filter = Object.fromEntries(new URLSearchParams(req.params.filter))
    const result = await userService.filterPetSitters(filter)

    res.json({result})
  } catch (err) {
    console.error('ERROR:', err)
    next(err);
  }
}