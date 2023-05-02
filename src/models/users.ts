import mongoose from "mongoose";

interface IServices  {
  serviceId: String,
  price: String,
  currency: String
}
interface IPetSitterInfo {
  allowedPets: String[],
  services: IServices[]
  others: String
}

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

export interface IPet {
  id: string;
  name: string;
  yearBirth: string;
  specie: string;
  breed: string;
  age: number;
  weight: number;
  picture: string;
  others: string;
}

interface IAlbum {
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
  email: string;
  password: string;
  name: string;
  address: string;
  district: string;
  city: string;
  state: string;
  country: string;
  phone: string;
  profilePicture: string;
  pets: IPet[];
  album: IAlbum[];
  posts: IPost[];
  isPetSitter: boolean;
  petSitterInfo: IPetSitterInfo;
  availableDates: IAvailableDates[]
  createdAt: Date;
  ratingsReceived: mongoose.Types.ObjectId[];
  bookings: mongoose.Types.ObjectId[];
}

export const UserSchema = new mongoose.Schema<IUser>({
  email: String,
  password: String,
  name: String,
  address: String,
  district: String,
  city: String,
  state: String,
  country: String,
  phone: String,
  profilePicture: String,
  pets: [
    {
      id: String,
      name: String,
      yearBirth: Number,
      specie: String,
      breed: String,
      age: Number,
      weight: Number,
      picture: String,
      others: String,
    }
  ],
  album: [
    {
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
  petSitterInfo: {
    allowedPets: [String],
    services: [
      {
        serviceId: String,
        price: Number,
        currency: String
      }
    ],
    others: String
  },
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
