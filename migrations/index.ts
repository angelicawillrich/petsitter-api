import mongoose from 'mongoose';
import { UserModel, RatingModel, BookingModel } from "../src/models";

mongoose.connect('mongodb://localhost:27017/petsitter', {});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', async function() {
  // create user
  const user1 = new UserModel({
    email: 'johndoe',
    password: 'password',
    name: 'John Doe',
    address: '123 Main St',
    district: 'centro',
    cityId: '1600212',
    cityName: 'Anytown',
    stateId: '16',
    stateName: 'ST',
    phone: '(53)12345678',
    country: 'US',
    pets: [
      {
        id: '1',
        name: 'Fluffy',
        specie: 'Dog',
        breed: 'Golden Retriever',
        age: 2,
        weight: 50,
        picture: 'https://example.com/pet.jpg'
      }
    ],
    album: [
      {
        id: '1',
        filename: 'photo1.jpg',
        date: new Date()
      }
    ],
    posts: [
      {
        id: '1',
        filename: 'post1.jpg',
        description: 'My first post',
        date: new Date()
      }
    ],
    isPetSitter: true,
    availableDates: [{
      initialDate: new Date(),
      finalDate: new Date(new Date().setFullYear(new Date().getFullYear() + 1)),
      weekDaysAndTime: [
        {
          weekday: 0,
          initialTime: '11:00',
          finalTime: '15:00'
        },
        {
          weekday: 1,
          initialTime: '9:00',
          finalTime: '10:00'
        },
        {
          weekday: 2,
          initialTime: '9:00',
          finalTime: '19:00'
        },
        {
          weekday: 6,
          initialTime: '10:00',
          finalTime: '12:00'
        }
      ]
    },
    {
      initialDate: new Date(),
      finalDate: new Date(new Date().setFullYear(new Date().getFullYear() + 1)),
      weekDaysAndTime: [
        {
          weekday: 1,
          initialTime: '11:00',
          finalTime: '15:00'
        },
        {
          weekday: 2,
          initialTime: '9:00',
          finalTime: '10:00'
        },
        {
          weekday: 3,
          initialTime: '9:00',
          finalTime: '19:00'
        },
        {
          weekday: 4,
          initialTime: '10:00',
          finalTime: '12:00'
        }
      ]
    }],
    createdAt: new Date()
  });
  const user2 = new UserModel({
    email: 'anabanana',
    password: 'password',
    name: 'Ana Banana',
    address: 'Winfriedstr. 000',
    district: 'centro',
    cityId: '1600253',
    cityName: 'Munich',
    stateId: '16',
    stateName: 'By',
    phone: '(53)12345678',
    country: 'GER',
    pets: [
      {
        id: '1',
        name: 'Mione',
        specie: 'Dog',
        breed: 'Vira-lata',
        age: 9,
        weight: 6,
        picture: 'https://example.com/pet.jpg'
      }
    ],
    album: [
      {
        filename: 'photo1.jpg',
        date: new Date()
      }
    ],
    posts: [
      {
        id: '1',
        filename: 'post1.jpg',
        description: 'My first post',
        date: new Date()
      }
    ],
    isPetSitter: true,
    availableDates: [{
      initialDate: new Date(),
      finalDate: new Date(new Date().setFullYear(new Date().getFullYear() + 1)),
      weekDaysAndTime: [
        {
          weekday: 0,
          initialTime: '11:00',
          finalTime: '15:00'
        },
        {
          weekday: 1,
          initialTime: '9:00',
          finalTime: '10:00'
        },
        {
          weekday: 2,
          initialTime: '9:00',
          finalTime: '19:00'
        },
        {
          weekday: 6,
          initialTime: '10:00',
          finalTime: '12:00'
        }
      ]
    },
    {
      initialDate: new Date(),
      finalDate: new Date(new Date().setFullYear(new Date().getFullYear() + 1)),
      weekDaysAndTime: [
        {
          weekday: 1,
          initialTime: '11:00',
          finalTime: '15:00'
        },
        {
          weekday: 2,
          initialTime: '9:00',
          finalTime: '10:00'
        },
        {
          weekday: 3,
          initialTime: '9:00',
          finalTime: '19:00'
        },
        {
          weekday: 4,
          initialTime: '10:00',
          finalTime: '12:00'
        }
      ]
    }],
    createdAt: new Date(),
    bookings: [],
    ratingsReceived: []
  });

  const rating1 = new RatingModel({
    reviewerId: user2._id,
    reviewedId: user1._id,
    rating: 4,
    description: 'Great service!',
    reviewedByPetSitter: false,
    createdAt: new Date()
  });
  
  const rating2 = new RatingModel({
    reviewerId: user1._id,
    reviewedId: user2._id,
    rating: 5,
    description: 'A cliente é sempre pontual',
    reviewedByPetSitter: true,
    createdAt: new Date()
  });

  const booking1 = new BookingModel(
    {
        petSitterId: user1._id,
        userId: user2._id,
        initialDate: "2023-06-01",
        finalDate: "2023-06-10",
        initialTime: "08:00",
        finalTime: "17:00",
        status: "approved",
        service: "1"
    },
  );
  const booking2 = new BookingModel(
    {
        petSitterId: user1._id,
        userId: user2._id,
        initialDate: "2022-02-01",
        finalDate: "2022-03-10",
        initialTime: "08:00",
        finalTime: "17:00",
        status: "rejected",
        service: "1"
    },
  );
  const booking3 = new BookingModel(
    {
        petSitterId: user1._id,
        userId: user2._id,
        initialDate: "2023-05-04",
        finalDate: "2023-05-10",
        initialTime: "08:00",
        finalTime: "17:00",
        status: "approved"
    },
  );
user1.ratingsReceived.push(rating1._id)

  user2.ratingsReceived.push(rating2._id)
  user2.bookings.push(booking1._id)
  user1.bookings.push(booking2._id)
  user1.bookings.push(booking3._id)

  user1.save();
  console.log('User created:', user1);
  await user2.save();
  console.log('User created:', user2);

  await rating1.save();
  console.log('Rating created:', rating1);
  await rating2.save();
  console.log('Rating created:', rating2);
  await booking1.save();
  console.log('Booking created:', booking1);
  await booking2.save();
  console.log('Booking created:', booking2);
  await booking3.save();
  console.log('Booking created:', booking3);

  db.close();
});
