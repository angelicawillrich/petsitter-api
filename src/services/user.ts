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

  export async function getPetSitterById(petSitterId) {
    try {
        const user = await UserModel.findById(petSitterId)
        .populate({
          path: 'bookings',
          populate: {
            path: 'userId',
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
        console.log(user.isPetSitter)
        if (!user.isPetSitter) return ({})
    
        return user
      } catch (err) {
        console.error('ERROR:', err)
        return {}
      }
  }

  export async function login(username: String, password: String) {
    try {
        const result = await UserModel.find({ username: username, password: password}).exec();
        return result
    } catch (err) {
        console.error('ERROR:', err)
        return {}
    }
  }