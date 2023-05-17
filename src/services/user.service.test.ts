import { userService } from '.';
import { UserRepo } from "../repos";
import { UserNotFound } from "../middlewares/errors/UserNotFound";
import { WrongCredentials } from '../middlewares/errors/WrongCredentials';
import { PetSitterNotFound } from '../middlewares/errors/PetSitterNotFound';
import { EmailAlreadyExists } from '../middlewares/errors/EmailAlreadyExists';

jest.mock('../models')

describe('user services', () => {
  it("should return user's details when getUserById is called with valid id", async () => {

    const userId = '1';
    const mockResponse = {
        _id: '1',
        email: 'a@a.com',
        name: 'Angélica'
    };

    UserRepo.getUserById = jest.fn().mockResolvedValue(mockResponse);

    const result = await userService.getUserById(userId);

    expect(result).toEqual(mockResponse);

  });

  it("should throw an error when userService.getUserById doesn't find a user with the specified id", async () => {
    const userId = '2';
    const mockResponse = null;

    UserRepo.getUserById = jest.fn().mockResolvedValue(mockResponse);

    await expect(userService.getUserById(userId)).rejects.toThrow(UserNotFound);
  });

  it("should return petSitter's details when getUserById is called with valid id and isPetSitter = true", async () => {

    const petSitter = '1';
    const mockResponse = [{
        _id: '1',
        email: 'a@a.com',
        name: 'Angélica',
        isPetSitter: true
    }];

    UserRepo.getPetSitterById = jest.fn().mockResolvedValue(mockResponse);

    const result = await userService.getPetSitterById(petSitter);

    expect(result).toEqual(mockResponse);

  });

  it("should throw an error when userService.getUserById doesn't find a user with the specified id", async () => {
    const userId = '2';
    const mockResponse = [];

    UserRepo.getPetSitterById = jest.fn().mockResolvedValue(mockResponse);

    await expect(userService.getPetSitterById(userId)).rejects.toThrow(PetSitterNotFound);
  });

  it("should throw an error when userService.getUserById doesn't find a user with the specified id but isPetSitter is false", async () => {
    const userId = '2';
    const mockResponse = [];

    UserRepo.getPetSitterById = jest.fn().mockResolvedValue(mockResponse);

    await expect(userService.getPetSitterById(userId)).rejects.toThrow(PetSitterNotFound);
  });

  it("should return user info when trying to log in with correct email and password", async () => {

    const email = 'johndoe';
    const password = 'password';

    const mockResponse = [{
      _id: '1',
      email: 'johndoe',
      name: 'Angélica',
      isPetSitter: true
  }];

    UserRepo.login = jest.fn().mockResolvedValue(mockResponse);

    const result = await userService.login(email, password);

    expect(result).toEqual(mockResponse);
  });

  it("should throw an error when trying to log in with wrong email and password", async () => {

    const email = 'a@a.com';
    const password = '12345';
    const mockResponse = [];

    UserRepo.login = jest.fn().mockResolvedValue(mockResponse);

    await expect(userService.login(email, password)).rejects.toThrow(WrongCredentials);
  });

  it("should fetch a list of petSitters", async () => {

    const mockResponse = [
      {
        _id: '1',
        email: 'a@a.com',
        name: 'Angélica',
        isPetSitter: true
      },
      {
        _id: '2',
        email: 'b@a.com',
        name: 'Angel',
        isPetSitter: true
      }
  ];

    UserRepo.fetchPetSitters = jest.fn().mockResolvedValue(mockResponse);

    const result = await userService.fetchPetSitters();

    expect(result).toEqual(mockResponse);
  });

  it("should create a user", async () => {
    const email = 'a@a.com';
    const password = '1234';
    const mockResponse = [
      {
        _id: '1',
        email: 'a@a.com',
        password: '1234',
      }
    ];
    const mockFindUserResponse = [];

    UserRepo.createUser = jest.fn().mockResolvedValue(mockResponse);
    UserRepo.findUser = jest.fn().mockResolvedValue(mockFindUserResponse);

    const result = await userService.createUser(email, password);

    expect(result).toEqual(mockResponse);
  });

  it("should throw an error when trying to create a user with an already registered email", async () => {

    const email = 'a@a.com';
    const password = '1234';
    const mockFindUserResponse = [{_id: '1234'}];

    UserRepo.findUser = jest.fn().mockResolvedValue(mockFindUserResponse);

    await expect(userService.createUser(email, password)).rejects.toThrow(EmailAlreadyExists);
  });

  it("should update a user", async () => {
    const userId = '1';
    const update = {
      pets: {
      name: 'Cacau',
      breed: 'vira-lata',
      age: 9,
      weight: 8,
      picture: 'https://example.com/pet.jpg',
      _id: 2
    }}
    const mockResponse = [
      {
        _id: '1',
        email: 'angelicaw',
        ratingsReceived: [],
        bookings: [],
        pets: [
          {
            name: 'Mione',
            breed: 'vira-lata',
            age: 9,
            weight: 6,
            picture: 'https://example.com/pet.jpg',
            _id: 1
          },
          {
            name: 'Cacau',
            breed: 'vira-lata',
            age: 9,
            weight: 8,
            picture: 'https://example.com/pet.jpg',
            _id: 2
          }
        ],
        __v: 0,
        country: 'BR',
        name: 'Angélica',
        isPetSitter: true
      }
    ];
    const mockFindUserResponse = [];

    UserRepo.updateUser = jest.fn().mockResolvedValue(mockResponse);

    const result = await userService.updateUser(userId, update);

    expect(result).toEqual(mockResponse);
  });

  it("should add photo to the album", async () => {
    const userId = '1';
    const addData = {
      filename: "photo.jpg",
      date: "2023-05-30",
    };
    const mockResponse = [
      {
        _id: '1',
        email: 'angelicaw',
        ratingsReceived: [],
        bookings: [],
        album: [
          {
            filename: 'photo.jpg',
            date: "2023-05-30",
          }
        ],
        __v: 0,
        country: 'BR',
        name: 'Angélica',
        isPetSitter: true
      }
    ];
    const mockFindUserResponse = [];

    UserRepo.updateUser = jest.fn().mockResolvedValue(mockResponse);

    const result = await userService.updateUser(userId, addData);

    expect(result).toEqual(mockResponse);
  });

  it("should throw an error when trying to add a photo to a user's album that doesn't exist", async () => {

    const userId = '1';
    const addData = {
      photo:"images/1/album/123.jpg"
    };
    const mockResponse = {};

    UserRepo.addPhotoAlbum = jest.fn().mockResolvedValue(mockResponse);

    const result = await userService.addPhotoAlbum(userId, addData);

    expect(result).toEqual(mockResponse);
  });

  it("should delete a photo from user's album", async () => {

    const userId = '1';
    const photoId = '1';
    const mockResponse = {};

    UserRepo.deletePhotoAlbum = jest.fn().mockResolvedValue(mockResponse);

    const result = await userService.deletePhotoAlbum(userId, photoId);

    expect(result).toEqual(mockResponse);
  });

  it("should create a post", async () => {
    const petSitterId = '1';
    const addData = {
      filename: 'images/1/posts/photo.jpg',
      description: 'descrition',
      date: '2023-05-22',
    };
    const mockResponse = [
      {
        _id: '1',
        email: 'angelicaw',
        ratingsReceived: [],
        bookings: [],
        posts: [
          {
            filename: 'images/1/posts/photo.jpg',
            description: 'descrition',
            date: '2023-05-22',
            _id: '1'
          }
        ],
        __v: 0,
        country: 'BR',
        name: 'Angélica',
        isPetSitter: true
      }
    ];

    UserRepo.createPost = jest.fn().mockResolvedValue(mockResponse);

    const result = await userService.createPost(petSitterId, addData);

    expect(result).toEqual(mockResponse);
  });

  it("should delete a post", async () => {
    const petSitterId = '1';
    const postId = '1'
    const mockResponse = [
      {
        _id: '1',
        email: 'angelicaw',
        ratingsReceived: [],
        bookings: [],
        posts: [],
        __v: 0,
        country: 'BR',
        name: 'Angélica',
        isPetSitter: true
      }
    ];

    UserRepo.deletePost = jest.fn().mockResolvedValue(mockResponse);

    const result = await userService.deletePost(petSitterId, postId);

    expect(result).toEqual(mockResponse);
  });

  it("should filter petSitters", async () => {

    const filter = {_id: '1', isPetSitter: true};
    const mockResponse = {
        _id: '1',
        email: 'a@a.com',
        name: 'Angélica',
        isPetSitter: true
    };

    UserRepo.filterPetSitters = jest.fn().mockResolvedValue(mockResponse);

    const result = await userService.filterPetSitters(filter);

    expect(result).toEqual(mockResponse);

  });

  it("should create available date", async () => {

    const userId = '1';
    const availableDate = {
      "initialDate": "2023-04-25",
      "finalDate": "2024-04-25",
      "weekDaysAndTime": [
        {
          "weekday": "1",
          "initialTime": "8:00",
          "finalTime": "18:00"
        },
        {
          "weekday": "3",
          "initialTime": "8:00",
          "finalTime": "18:00"
        },
        {
          "weekday": "5",
          "initialTime": "8:00",
          "finalTime": "18:00"
        }
      ]
    }
    const mockResponse = {
        _id: '1',
        email: 'a@a.com',
        name: 'Angélica',
        isPetSitter: true,
        availableDates: [
          {
            "initialDate": "2023-04-25",
            "finalDate": "2024-04-25",
            "weekDaysAndTime": [
              {
                "weekday": "1",
                "initialTime": "8:00",
                "finalTime": "18:00"
              },
              {
                "weekday": "3",
                "initialTime": "8:00",
                "finalTime": "18:00"
              },
              {
                "weekday": "5",
                "initialTime": "8:00",
                "finalTime": "18:00"
              }
            ]
          }
        ]
    };

    UserRepo.createAvailableDate = jest.fn().mockResolvedValue(mockResponse);

    const result = await userService.createAvailableDate(userId, availableDate);

    expect(result).toEqual(mockResponse);

  });

  it("should update available date", async () => {

    const userId = '1';
    const availableDateId = '1';
    const availableDate = {
      "initialDate": "2023-04-25",
      "finalDate": "2024-05-25",
      "weekDaysAndTime": [
        {
          "weekday": "1",
          "initialTime": "8:00",
          "finalTime": "18:00"
        },
        {
          "weekday": "3",
          "initialTime": "8:00",
          "finalTime": "18:00"
        },
        {
          "weekday": "5",
          "initialTime": "8:00",
          "finalTime": "18:00"
        }
      ]
    }
    const mockResponse = {
        _id: '1',
        email: 'a@a.com',
        name: 'Angélica',
        isPetSitter: true,
        availableDates: [
          {
            "initialDate": "2023-04-25",
            "finalDate": "2024-05-25",
            "weekDaysAndTime": [
              {
                "weekday": "1",
                "initialTime": "8:00",
                "finalTime": "18:00"
              },
              {
                "weekday": "3",
                "initialTime": "8:00",
                "finalTime": "18:00"
              },
              {
                "weekday": "5",
                "initialTime": "8:00",
                "finalTime": "18:00"
              }
            ]
          }
        ]
    };

    UserRepo.updateAvailableDate = jest.fn().mockResolvedValue(mockResponse);

    const result = await userService.updateAvailableDate(userId, availableDateId, availableDate);

    expect(result).toEqual(mockResponse);

  });

  it("should delete available date", async () => {

    const userId = '1';
    const availableDateId = '1';
    const mockResponse = {
        _id: '1',
        email: 'a@a.com',
        name: 'Angélica',
        isPetSitter: true,
        availableDates: []
    };

    UserRepo.deleteAvailableDates = jest.fn().mockResolvedValue(mockResponse);

    const result = await userService.deleteAvailableDate(userId, availableDateId);

    expect(result).toEqual(mockResponse);

  });
})
