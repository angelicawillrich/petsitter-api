import { UserModel, RatingModel, BookingModel } from "../models";

export async function getUserById(userId) {
    try {
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
        populate: {
          path: 'reviewerId',
          select: 'name'
        }
      })
      .exec()
  
      return user
    } catch (err) {
      console.error('ERROR:', err)
      return {}
    }
  }