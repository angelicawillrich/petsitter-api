const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  username: String,
  password: String,
  name: String,
  address: String,
  city: String,
  state: String,
  country: String,
  profilePicture: String,
  pets: [
    {
      id: String,
      name: String,
      specie: String,
      breed: String,
      age: Number,
      weight: Number,
      picture: String
    }
  ],
  album: [
    {
      id: String,
      filename: String,
      date: Date
    }
  ],
  posts: [
    {
      id: String,
      filename: String,
      description: String,
      date: Date
    }
  ],
  isPetSitter: Boolean,
  createdAt: Date,
  ratingsReceived: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Rating'
    }
  ],
  bookings: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Booking'
    }
  ]
});

const UserModel = mongoose.model('User', UserSchema);

module.exports = UserModel;
