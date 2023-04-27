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

  it("should return TRUE when trying to log in with correct email and password", async () => {

    const email = 'a@a.com';
    const password = '1234';
    const mockQueryResponse = ['1234'];
    const mockResponse = true;

    UserRepo.login = jest.fn().mockResolvedValue(mockQueryResponse);

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
})
