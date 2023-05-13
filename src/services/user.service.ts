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
    if (!result.length) {
      throw new WrongCredentials();
    }
    return result;
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

  export async function addPhotoAlbum(userId: string, addData:any) {
    const result = await UserRepo.addPhotoAlbum(userId, addData);
    return result
  }

  export async function deletePhotoAlbum(userId: string, album: any) {
    const result = await UserRepo.updateUser(userId, album);
    return result
  }

  export async function createPost(userId: string, addData:any) {
    const result = await UserRepo.createPost(userId, addData);
    return result
  }

  export async function deletePost(userId: string, post: any) {
    const result = await UserRepo.updateUser(userId, post);
    return result
  }

  export async function filterPetSitters(filter: any) {
    const result = await UserRepo.filterPetSitters(filter);

    return result
  }

  export async function createAvailableDate(userId: string, availableDate: any) {
    const result = await UserRepo.createAvailableDate(userId, availableDate);

    return result
  }

  export async function updateAvailableDate(userId: string, availableDateId: string, availableDate: any) {
    const result = await UserRepo.updateAvailableDate(userId, availableDateId, availableDate);

    return result
  }

  export async function deleteAvailableDate(userId: string, availableDateId: any) {
    const result = await UserRepo.deleteAvailableDates(userId, availableDateId);
    return result
  }