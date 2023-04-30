import { UserModel } from "../models";

export async function getUserById (userId: string) {
    const user = await UserModel.findById(userId)
    .select('-password')
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
    return user;
}

export async function findUser (email: string) {
    const result = await UserModel.find({email: email }).select('_id').exec();
    return result;
}

export async function getPetSitterById (petSitterId: string) {
    const petSitter = await UserModel.find({_id: petSitterId, isPetSitter: true })
    .select('name email address city state country profilePicture posts isPetSitter availableDates')
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
    return petSitter;
}

export async function fetchPetSitters () {
    const result = await UserModel.find({ isPetSitter: true})
    .limit(5)
    .select('name address city email phone state')
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

export async function createUser (email: string, password: string, createdAt: Date) {
    const result = await UserModel.create({ email: email, password: password, createdAt: createdAt});
    return result
}

export async function login (email: string, password: string) {
    const result = await UserModel.find({ email: email, password: password})
    .select('-password')
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
    .exec();
    return result;
}

export async function updateUser (userId: string, update: any) {
    const result = await UserModel.findOneAndUpdate({_id: userId}, update);
    return result
}

export async function updateUserBooking(userId: string, bookingId: string) {
    await UserModel.findOneAndUpdate(
      { _id: userId }, 
      { $push: { bookings: bookingId } },
  );
}

export async function updateReviewedIdUserRating(reviewedId: string, ratingId: string) {
    await UserModel.findOneAndUpdate(
        { _id: reviewedId }, 
        { $push: { ratingsReceived: ratingId } },
    );
}