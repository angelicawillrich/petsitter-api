import mongoose from 'mongoose';
import { UserModel, RatingModel, BookingModel } from "../src/models";
import * as path from 'path';
import fs from 'fs';

const copyMigrationImages = (userId: string, subFolder: string, filename: string) => {
  const publicDirectory = path.join(process.cwd(), 'public', 'assets');
  const publicFilePath = path.join(publicDirectory, filename);

  const imagesDirectory = path.join(process.cwd(), 'dist', 'images');
  const userFolderPath = path.join(imagesDirectory, userId);
  const subFolderPath = path.join(userFolderPath, subFolder);

  const filePath = path.join(subFolderPath, filename);

  if (!fs.existsSync(imagesDirectory)) {
    fs.mkdirSync(imagesDirectory);
  }

  if (!fs.existsSync(userFolderPath)) {
    fs.mkdirSync(userFolderPath);
  }

  if (!fs.existsSync(subFolderPath)) {
    fs.mkdirSync(subFolderPath);
  }

  fs.copyFileSync(publicFilePath, filePath);
  console.log(`File ${filename} copied to folder ${subFolder}.`);
}

mongoose.connect('mongodb://localhost:27017/petsitter', {});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', async function() {
  // create user
  const user1 = new UserModel({
    email: 'johndoe@email.com',
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
    isPetSitter: true,
    pets: [],
    album: [],
    posts: [],
    petSitterInfo: {
      allowedPets: ['0'],
      services: [
        {
          serviceId: 0,
          price: 55
        },
        {
          serviceId: 1,
          price: 60
        },
      ],
      others: 'Adoro animais!!!'
    },
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
          initialTime: '09:00',
          finalTime: '10:00'
        },
        {
          weekday: 2,
          initialTime: '09:00',
          finalTime: '19:00'
        },
        {
          weekday: 6,
          initialTime: '10:00',
          finalTime: '12:00'
        }
      ]
    },
  ],
    createdAt: new Date()
  });

  user1.profilePicture = `/images/${user1._id}/profile/johndoe.png`
  copyMigrationImages(String(user1._id), 'profile', 'johndoe.png')

  user1.pets.push(
    {
      name: 'Fluffy',
      specie: '1',
      breed: 'vira-lata',
      yearBirth: '2020',
      age: 2,
      weight: 6,
      picture: `/images/${user1._id}/pets/dog1.jpg`,
      others: 'Sweet dod'
    }
  )
  copyMigrationImages(String(user1._id), 'pets', 'dog1.jpg')

  user1.album.push(
    {
      filename: `/images/${user1._id}/album/dog1_1.jpg`,
      date: new Date()
    },
    {
      filename: `/images/${user1._id}/album/dog1_2.jpg`,
      date: new Date()
    },
    {
      filename: `/images/${user1._id}/album/dog1_3.jpg`,
      date: new Date()
    }
  )

  copyMigrationImages(String(user1._id), 'album', 'dog1_1.jpg')
  copyMigrationImages(String(user1._id), 'album', 'dog1_2.jpg')
  copyMigrationImages(String(user1._id), 'album', 'dog1_3.jpg')

  user1.posts.push(
    {
      filename: `/images/${user1._id}/posts/dog1_3.jpg`,
      description: 'This is Mione!',
      date: new Date()
    }
  )

  copyMigrationImages(String(user1._id), 'posts', 'dog1_3.jpg')

  const user2 = new UserModel({
    email: 'anamaria@email.com',
    password: 'password',
    name: 'Ana Maria',
    address: 'Winfriedstr. 000',
    district: 'centro',
    cityId: '1600253',
    cityName: 'Munich',
    stateId: '16',
    stateName: 'By',
    phone: '(53)12345678',
    country: 'GER',
    pets: [],
    album: [],
    isPetSitter: false,
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
  ],
    createdAt: new Date(),
    bookings: [],
    ratingsReceived: []
  });

  user2.profilePicture = `/images/${user2._id}/profile/anamaria.png`

  copyMigrationImages(String(user2._id), 'profile', 'anamaria.png')

  user2.pets.push(
    {
      name: 'Cacau',
      specie: '1',
      breed: 'Vira-lata',
      yearBirth: '2020',
      age: 2,
      weight: 9,
      picture: `/images/${user2._id}/pets/dog2.jpg`,
      others: 'Sweet dod'
    }
  )

  copyMigrationImages(String(user2._id), 'pets', 'dog2.jpg')

  user2.album.push(
    {
      filename: `/images/${user2._id}/album/dog2_1.jpg`,
      date: new Date()
    }
  )

  copyMigrationImages(String(user2._id), 'album', 'dog2_1.jpg')

  const user3 = new UserModel({
    email: 'maria@email.com',
    password: 'password',
    name: 'Maria',
    address: 'Rua 2, 130',
    district: 'centro',
    cityId: '1600212',
    cityName: 'Anytown',
    stateId: '16',
    stateName: 'ST',
    phone: '(53)12345678',
    country: 'US',
    isPetSitter: true,
    pets: [],
    album: [],
    posts: [],
    petSitterInfo: {
      allowedPets: ['0'],
      services: [
        {
          serviceId: 0,
          price: 55
        },
      ],
      others: 'Cuido de animais há 10 anos.'
    },
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
          initialTime: '09:00',
          finalTime: '10:00'
        },
        {
          weekday: 2,
          initialTime: '09:00',
          finalTime: '19:00'
        },
        {
          weekday: 6,
          initialTime: '10:00',
          finalTime: '12:00'
        }
      ]
    },
  ],
    createdAt: new Date()
  });

  user3.profilePicture = `/images/${user3._id}/profile/maria.png`
  copyMigrationImages(String(user3._id), 'profile', 'maria.png')

  user3.posts.push(
    {
      filename: `/images/${user3._id}/posts/dog1_1.jpg`,
      description: 'This is Mione!',
      date: new Date()
    }
  )

  copyMigrationImages(String(user3._id), 'posts', 'dog1_1.jpg')


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

  const rating3 = new RatingModel({
    reviewerId: user2._id,
    reviewedId: user3._id,
    rating: 5,
    description: 'Super PetSitter!',
    reviewedByPetSitter: false,
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
        initialDate: "2023-05-29",
        finalDate: "2023-05-30",
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
        status: "approved",
        service: "1"
    },
  );
  const booking4 = new BookingModel(
    {
        petSitterId: user3._id,
        userId: user2._id,
        initialDate: "2023-06-15",
        finalDate: "2023-06-16",
        initialTime: "08:00",
        finalTime: "17:00",
        status: "approved",
        service: "1"
    },
  );
  user1.ratingsReceived.push(rating1._id)
  user2.ratingsReceived.push(rating2._id)
  user3.ratingsReceived.push(rating3._id)

  user1.bookings.push(booking1._id)
  user2.bookings.push(booking1._id)
  user1.bookings.push(booking2._id)
  user2.bookings.push(booking2._id)
  user1.bookings.push(booking3._id)
  user2.bookings.push(booking3._id)
  user2.bookings.push(booking4._id)
  user3.bookings.push(booking4._id)

  user1.save();
  console.log('User created:', user1);
  await user2.save();
  console.log('User created:', user2);
  await user3.save();
  console.log('User created:', user3);

  await rating1.save();
  console.log('Rating created:', rating1);
  await rating2.save();
  console.log('Rating created:', rating2);
  await rating3.save();
  console.log('Rating created:', rating3);

  await booking1.save();
  console.log('Booking created:', booking1);
  await booking2.save();
  console.log('Booking created:', booking2);
  await booking3.save();
  console.log('Booking created:', booking3);
  await booking4.save();
  console.log('Booking created:', booking4);

  db.close();  
});




