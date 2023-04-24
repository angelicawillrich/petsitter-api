import { UserModel, RatingModel, BookingModel } from "../models";

export async function getUserById(userId) {
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

  export async function getPetSitterById(petSitterId) {
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