import { UserNotFound } from "../middlewares/errors/UserNotFound";
import { PetSitterNotFound } from "../middlewares/errors/PetSitterNotFound";
import { WrongCredentials } from "../middlewares/errors/WrongCredentials";
import { UsernameAlreadyExists } from "../middlewares/errors/UsernameAlreadyExists";
import { UserRepo } from "../repos";

export async function getUserById(userId: string) {
    const user = await UserRepo.getUserById(userId);

    if (!user) {
      throw new UserNotFound();
    }

    return user
  }

  export async function getPetSitterById(petSitterId: string) {
    const petSitter = await UserRepo.getPetSitterById(petSitterId)

    if (petSitter.length === 0) {
      throw new PetSitterNotFound();
    }

    return petSitter
  }

  export async function login(username: string, password: string) {
    const result = await UserRepo.login(username, password)
    let correctUsernameAndPassword = true;
    if (!result.length) {
      correctUsernameAndPassword = false;
      throw new WrongCredentials();
    }
    return correctUsernameAndPassword;
  }

  export async function fetchPetSitters() {
    const petSitters = await UserRepo.fetchPetSitters()
    return petSitters
  }

  export async function createUser(username: string, password: string) {
    const usernameAlreadyExists = await UserRepo.findUser(username)
    if (usernameAlreadyExists.length > 0) {
      throw new UsernameAlreadyExists();
    }
    const createdAt = new Date()
    const result = await UserRepo.createUser(username, password, createdAt);
    return result
  }

  export async function updateUser(userId: string, update: any) {
    const result = await UserRepo.updateUser(userId, update);
    return result
  }
