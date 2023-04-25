import { usernameAlreadyExistsError } from "../middlewares/errors";
import { UserModel, RatingModel, BookingModel } from "../models";

export async function getUserById(userId: string) {
    const user = await UserModel.findById(userId)
    .populate({
    path: 'bookings',
    populate: {
        path: 'petSitterId',
        select: 'name address city state profilePicture'
    }
    })
    .populate({
    path: 'ratingsReceived',
    match: {reviewedByPetSitter: true},
    populate: {
        path: 'reviewerId',
        select: 'name'
    }
    })
    .exec()

    return user
  }

  export async function getPetSitterById(petSitterId: string) {
    const user = await UserModel.find({_id: petSitterId, isPetSitter: true })
    .populate({
        path: 'bookings',
        populate: {
        path: 'userId',
        select: 'name address city state profilePicture'
        }
    })
    .populate({
        path: 'ratingsReceived',
        match: {reviewedByPetSitter: false},
        populate: {
        path: 'reviewerId',
        select: 'name'
        }
    })
    .exec()

    return user
  }

  export async function login(username: String, password: String) {
    const result = await UserModel.find({ username: username, password: password}).exec();
    return result
  }

  export async function fetchPetSitters() {
    const result = await UserModel.find({ isPetSitter: true})
    .limit(5)
    .select('name address city')
    .populate({
        path: 'ratingsReceived',
        match: {reviewedByPetSitter: false},
        populate: {
            path: 'reviewedId',
            select: 'name'
        }
        })
    .exec();
    return result
  }

  export async function createUser(username: string, password: string) {
    const usernameAlreadyExists = await UserModel.find({username: username }).exec();
    if (usernameAlreadyExists.length > 0) {
      throw usernameAlreadyExistsError;
    }
    const createdAt = new Date()
    const result = await UserModel.create({ username: username, password: password, createdAt: createdAt});
    return result
  }

  export async function updateUser(userId: string, update: any) {
    console.log('userId, update', userId, update)
    const options = {
      new: true, // to return the updated document
    };

    const result = await UserModel.findOneAndUpdate({_id: userId}, update, options);
    return result

  }