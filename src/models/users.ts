import mongoose from "mongoose";

interface IAllowedPets {
  petId: String
}

interface IServices  {
  serviceId: String,
  price: Number,
  currency: String
}
interface IPetSitterInfo {
  allowedPets: IAllowedPets[],
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
  email: string;
  password: string;
  name: string;
  address: string;
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
  city: String,
  state: String,
  country: String,
  phone: String,
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
  petSitterInfo: {
    allowedPets: [
      {
        petId: String
      }
    ],
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
