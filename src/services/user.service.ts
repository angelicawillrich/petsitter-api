import { UserNotFound } from "../middlewares/errors/UserNotFound";
import { PetSitterNotFound } from "../middlewares/errors/PetSitterNotFound";
import { WrongCredentials } from "../middlewares/errors/WrongCredentials";
import { EmailAlreadyExists } from "../middlewares/errors/EmailAlreadyExists";
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

  export async function login(email: string, password: string) {
    const result = await UserRepo.login(email, password)
    let correctEmailAndPassword = true;
    if (!result.length) {
      correctEmailAndPassword = false;
      throw new WrongCredentials();
    }
    return correctEmailAndPassword;
  }

  export async function fetchPetSitters() {
    const petSitters = await UserRepo.fetchPetSitters()
    return petSitters
  }

  export async function createUser(email: string, password: string) {
    const emailAlreadyExists = await UserRepo.findUser(email)
    if (emailAlreadyExists.length > 0) {
      throw new EmailAlreadyExists();
    }
    const createdAt = new Date()
    const result = await UserRepo.createUser(email, password, createdAt);
    return result
  }

  export async function updateUser(userId: string, update: any) {
    const result = await UserRepo.updateUser(userId, update);
    return result
  }
