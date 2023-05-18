import { Request } from 'express';
import { userController } from '.';
import { InvalidId } from '../middlewares/errors/InvalidId';
import { MissingRequiredParams } from '../middlewares/errors/MissingRequiredParams';
import { NotFoundError } from '../middlewares/errors/NotFoundError';
import { InvalidEmail } from '../middlewares/errors/InvalidEmail';

jest.mock('../models')

describe('user controller', () => {
  let mockRequest
  let mockResponse
  let mockNext

beforeEach(() => {
  mockRequest = {
    body: {},
    params: {}
  } as Request

  mockResponse = {
    json: jest.fn(),
    status: jest.fn(),
  } as any

  mockNext = (error) => {
    throw error
  };
})
  it("should throw an error when getUserById with no id", async () => {
    mockRequest = {
      params: {
        id: null,
      },
    };

    await expect(userController.getUserById(mockRequest, mockResponse, mockNext)).rejects.toThrow(MissingRequiredParams);
  });

  it("should throw an error when getUserById is called with invalid id", async () => {
    mockRequest = {
      params: {
        id: '1',
      },
    };

    await expect(userController.getUserById(mockRequest, mockResponse, mockNext)).rejects.toThrow(InvalidId);
  });

  it("should throw an error when getPetSitterById with no id", async () => {
    mockRequest = {
      params: {
        id: null,
      },
    };

    await expect(userController.getPetSitterById(mockRequest, mockResponse, mockNext)).rejects.toThrow(MissingRequiredParams);
  });

  it("should throw an error when getPetSitterById is called with invalid id", async () => {
    mockRequest = {
      params: {
        id: '1',
      },
    };

    await expect(userController.getPetSitterById(mockRequest, mockResponse, mockNext)).rejects.toThrow(InvalidId);
  });

  it("should throw an error when adding photo and with no user id and photo", async () => {
    mockRequest = {
      body: {
        userId: null,
        photo: null
      },
    };

    await expect(userController.addPhotoAlbum(mockRequest, mockResponse, mockNext)).rejects.toThrow(MissingRequiredParams);
  });

  it("should throw an error when logging in and email or password is misssing", async () => {
    mockRequest = {
      body: {
        email: null,
        password: null
      },
    };

    await expect(userController.login(mockRequest, mockResponse, mockNext)).rejects.toThrow(MissingRequiredParams);
  });

  it("should throw an error when logging out and headers authorization is misssing", async () => {
    mockRequest = {
      headers: {
        authorization: null,
      },
    };

    await expect(userController.logout(mockRequest, mockResponse, mockNext)).rejects.toThrow(MissingRequiredParams);
  });

  it("should throw an error when logging out and headers authorization is invalid", async () => {
    mockRequest = {
      headers: {
        authorization: '111',
      },
    };

    await expect(userController.logout(mockRequest, mockResponse, mockNext)).rejects.toThrow(NotFoundError);
  });

  it("should throw an error when creating user and email or password is misssing", async () => {
    mockRequest = {
      body: {
        email: null,
        password: null,
      },
    };

    await expect(userController.createUser(mockRequest, mockResponse, mockNext)).rejects.toThrow(MissingRequiredParams);
  });

  it("should throw an error when creating user with invalid email", async () => {
    mockRequest = {
      body: {
        email: 'invalidEmail',
        password: '123456',
      },
    };

    await expect(userController.createUser(mockRequest, mockResponse, mockNext)).rejects.toThrow(InvalidEmail);
  });

  it("should throw an error when updating user profile with missing params", async () => {
    mockRequest = {
      body: {
        userId: '1234',
        name: 'Angélica',
      },
    };

    await expect(userController.updateProfile(mockRequest, mockResponse, mockNext)).rejects.toThrow(MissingRequiredParams);
  });

  it("should throw an error when updating user profile with invalid user id", async () => {
    mockRequest = {
      body: {
        userId: '1234',
        name: 'Angélica',
        address: 'Rua 1',
        cityId: '1',
        cityName: 'Pelotas',
        stateId: '1',
        stateName: 'RS',
        phone: '53 99123456'
      },
    };

    await expect(userController.updateProfile(mockRequest, mockResponse, mockNext)).rejects.toThrow(InvalidId);
  });

  it("should throw an error when updating user pets with missing params", async () => {
    mockRequest = {
      body: {
        userId: '1234',
      },
    };

    await expect(userController.updatePets(mockRequest, mockResponse, mockNext)).rejects.toThrow(MissingRequiredParams);
  });

  it("should throw an error when updating user pets with missing params", async () => {
    mockRequest = {
      body: {
        userId: '1234',
        pets: [
          {name: 'cacau'}
        ]
      },
    };

    await expect(userController.updatePets(mockRequest, mockResponse, mockNext)).rejects.toThrow(InvalidId);
  });

  it("should throw an error when adding photo and there are missing params", async () => {
    mockRequest = {
      body: {
        userId: '1',
        photo: null,
      },
    };

    await expect(userController.addPhotoAlbum(mockRequest, mockResponse, mockNext)).rejects.toThrow(MissingRequiredParams);
  });

  it("should throw an error when adding photo and user id is invalid", async () => {
    mockRequest = {
      body: {
        userId: '1',
        photo: 'aaa.jpg'
      },
    };

    await expect(userController.addPhotoAlbum(mockRequest, mockResponse, mockNext)).rejects.toThrow(InvalidId);
  });

  it("should throw an error when deleting photo and there are missing params", async () => {
    mockRequest = {
      params: {
        userId: '1',
        photoId: null,
      },
    };

    await expect(userController.deletePhotoAlbum(mockRequest, mockResponse, mockNext)).rejects.toThrow(MissingRequiredParams);
  });

  it("should throw an error when deleting photo and there user or photo id is invalid", async () => {
    mockRequest = {
      params: {
        deleteDataParams: {
          userId: '1',
          photoId: '2'  
        }
      },
    };

    await expect(userController.deletePhotoAlbum(mockRequest, mockResponse, mockNext)).rejects.toThrow(InvalidId);
  });

  it("should throw an error when creating a post and there are missing params", async () => {
    mockRequest = {
      body: {
        petSitterId: '1',
        filename: null,
      },
    };

    await expect(userController.createPost(mockRequest, mockResponse, mockNext)).rejects.toThrow(MissingRequiredParams);
  });

  it("should throw an error when creating a post and petSitterId is invalid", async () => {
    mockRequest = {
      body: {
        petSitterId: '1',
        filename: 'image.jpg',
      },
    };

    await expect(userController.createPost(mockRequest, mockResponse, mockNext)).rejects.toThrow(InvalidId);
  });

  it("should throw an error when deleting a post and params are missing", async () => {
    mockRequest = {
      params: {
        deleteDataParams: {
          userId: '1',
        }
      },
    };

    await expect(userController.deletePost(mockRequest, mockResponse, mockNext)).rejects.toThrow(MissingRequiredParams);
  });

  it("should throw an error when deleting a post and petSitterId is invalid", async () => {
    mockRequest = {
      params: {
        deleteDataParams: {
          userId: '1',
          postId: '1',  
        }
      },
    };

    await expect(userController.deletePost(mockRequest, mockResponse, mockNext)).rejects.toThrow(InvalidId);
  });

  it("should throw an error when updating petSitter info and there are missing params", async () => {
    mockRequest = {
      body: {
        userId: '1',
      },
    };

    await expect(userController.updatePetSitter(mockRequest, mockResponse, mockNext)).rejects.toThrow(MissingRequiredParams);
  });

  it("should throw an error when updating petSitter info and id is invalid", async () => {
    mockRequest = {
      body: {
        userId: '1',
        petSitterInfo: {
          others: 'some information'
        },
      },
    };

    await expect(userController.updatePetSitter(mockRequest, mockResponse, mockNext)).rejects.toThrow(InvalidId);
  });

  it("should throw an error when creating availableDates and there are missing params", async () => {
    mockRequest = {
      body: {
        userId: '1',
      },
    };

    await expect(userController.createAvailableDate(mockRequest, mockResponse, mockNext)).rejects.toThrow(MissingRequiredParams);
  });

  it("should throw an error when creating availableDates and id is invalid", async () => {
    mockRequest = {
      body: {
        userId: '1',
        availableDate: {
          initialDate: '2023-06-13T00:00:00.000+00:00',
          finalDate: '2023-08-25T00:00:00.000+00:00'
        }
      },
    };

    await expect(userController.createAvailableDate(mockRequest, mockResponse, mockNext)).rejects.toThrow(InvalidId);
  });

  it("should throw an error when updating availableDates and there are missing params", async () => {
    mockRequest = {
      body: {
        userId: '1',
      },
    };

    await expect(userController.updateAvailableDate(mockRequest, mockResponse, mockNext)).rejects.toThrow(MissingRequiredParams);
  });

  it("should throw an error when updatng availableDates and id is invalid", async () => {
    mockRequest = {
      body: {
        userId: '1',
        availableDateId: '1',
        availableDate: {
          initialDate: '2023-06-13T00:00:00.000+00:00',
          finalDate: '2023-08-25T00:00:00.000+00:00'
        }
      },
    };

    await expect(userController.updateAvailableDate(mockRequest, mockResponse, mockNext)).rejects.toThrow(InvalidId);
  });

  it("should throw an error when deleting a availableDate and params are missing", async () => {
    mockRequest = {
      params: {
        availableDateParams: {
          userId: '1',
        }
      },
    };

    await expect(userController.deleteAvailableDate(mockRequest, mockResponse, mockNext)).rejects.toThrow(MissingRequiredParams);
  });

  it("should throw an error when deleting availableDate and id is invalid", async () => {
    mockRequest = {
      params: {
        availableDateParams: {
          userId: '1',
          availableDateId: '1',  
        }
      },
    };

    await expect(userController.deleteAvailableDate(mockRequest, mockResponse, mockNext)).rejects.toThrow(InvalidId);
  });

})
