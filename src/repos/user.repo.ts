import { UserModel } from "../models";

export async function getUserById (userId: string) {
    const user = await UserModel.findById(userId)
    .select('-password')
    .populate({
        path: 'bookings',
        options: { sort: ({initialDate: 'asc'})},
        match: {
            status: {
                $in: [
                  "pending",
                  "approved"
                ]
              },
            finalDate: {
                $gt: new Date()
            }
        },
        populate: {
            path: 'petSitterId',
            select: 'name address cityName stateName profilePicture'
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
    .select('name email phone address district cityName stateName country profilePicture posts isPetSitter availableDates petSitterInfo')
    .populate({
        path: 'bookings',
        populate: {
            path: 'userId',
            select: 'name address cityName stateName profilePicture',
        },
        options: { sort: ({initialDate: 'asc'})},
        match: {
            petSitterId: {$eq: petSitterId},
            status: {
                $in: [
                  "pending",
                  "approved"
                ]
            },
            finalDate: {
                $gt: new Date()
            }
        },
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
    .select('_id name address cityName email phone stateName profilePicture district petSitterInfo ratingsReceived')
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
        select: 'name address cityName stateName profilePicture'
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

export async function addPhotoAlbum(userId: string, addData: any) {
    await UserModel.findOneAndUpdate(
        { _id: userId }, 
        { $push: { album: addData } },
      );
}

export async function deletePhotoAlbum(userId: string, photoId: string) {
    await UserModel.updateOne({ _id: userId }, {
        $pull: {
            'album': {_id: photoId},
        },
    });
}

export async function createPost(userId: string, addData: any) {
    await UserModel.findOneAndUpdate(
        { _id: userId }, 
        { $push: { posts: addData } },
      );
}

export async function deletePost(userId: string, postId: string) {
    await UserModel.updateOne({ _id: userId }, {
        $pull: {
            'posts': {_id: postId},
        },
    });
}

export async function filterPetSitters (filter) {
    const result = await UserModel.find(filter)
    .select('name cityName stateName profilePicture district petSitterInfo ratingsReceived')
    .populate({
        path: 'ratingsReceived',
        match: {reviewedByPetSitter: false},
        select: 'rating'
    })
    .exec();

    return result
}

export async function createAvailableDate(userId: string, availableDate: any) {
    const result =  await UserModel.findOneAndUpdate(
        { _id: userId }, 
        { $push: { availableDates: availableDate } },
      );
   return result
}

export async function updateAvailableDate(userId: string, availableDateId: string, availableDate: any) {
    const result =  await UserModel.updateOne(
        { _id: userId, 'availableDates._id': availableDateId },
        { $set: { 'availableDates.$[element]': availableDate } },
        { arrayFilters: [ { "element._id":availableDateId } ] }
   )
   return result
}

export async function deleteAvailableDates(userId: string, availableDateId: any) {
    const result = await UserModel.updateOne({ _id: userId }, {
        $pull: {
            'availableDates': {_id: availableDateId},
        },
    });
    return result
}