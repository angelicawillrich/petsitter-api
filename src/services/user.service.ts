import { userNotFound, usernameAlreadyExistsError } from "../middlewares/errors";
import { UserRepo } from "../repos";

export async function getUserById(userId: string) {
    const user = await UserRepo.getUserById(userId);

    if (!user) {
      throw userNotFound;
    }

    return user
  }

  export async function getPetSitterById(petSitterId: string) {
    const petSitter = await UserRepo.getPetSitterById(petSitterId)

    if (petSitter.length === 0) {
      throw userNotFound;
    }

    return petSitter
  }

  export async function login(username: string, password: string) {
    const result = await UserRepo.login(username, password)
    return result
  }

  export async function fetchPetSitters() {
    const petSitters = await UserRepo.fetchPetSitters()
    return petSitters
  }

  export async function createUser(username: string, password: string) {
    const usernameAlreadyExists = await UserRepo.findUser(username)
    if (usernameAlreadyExists.length > 0) {
      throw usernameAlreadyExistsError;
    }
    const createdAt = new Date()
    const result = await UserRepo.createUser(username, password, createdAt);
    return result
  }

  export async function updateUser(userId: string, update: any) {
    const result = await UserRepo.updateUser(userId, update);
    return result
  }
