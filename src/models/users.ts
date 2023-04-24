import mongoose from "mongoose";

interface IWeekDaysAndTime {
  weekday: String;
  initialTime: String;
  finalTime: String
}

interface IAvailableDates {
  id: String;
  initialDate: Date;
  finalDate: Date;
  weekDaysAndTime: IWeekDaysAndTime[]
}

interface IPet {
  id: string;
  name: string;
  specie: string;
  breed: string;
  age: number;
  weight: number;
  picture: string;
}

interface IAlbum {
  id: string;
  filename: string;
  date: Date;
}

interface IPost {
  id: string;
  filename: string;
  description: string;
  date: Date;
}

export interface IUser {
  username: string;
  password: string;
  name: string;
  address: string;
  city: string;
  state: string;
  country: string;
  profilePicture: string;
  pets: IPet[];
  album: IAlbum[];
  posts: IPost[];
  isPetSitter: boolean;
  availableDates: IAvailableDates[]
  createdAt: Date;
  ratingsReceived: mongoose.Types.ObjectId[];
  bookings: mongoose.Types.ObjectId[];
}

export const UserSchema = new mongoose.Schema<IUser>({
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
  availableDates: [
    {
      id: String,
      initialDate: Date,
      finalDate: Date,
      weekDaysAndTime: [
        {
          weekday: String,
          initialTime: String,
          finalTime: String
        }
      ]
    }
  ],
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
