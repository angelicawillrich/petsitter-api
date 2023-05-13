import { Router } from 'express';
import { bookingController, userController, ratingController } from '../controllers';
import sessionChecker from '../middlewares/sessions/sessions.middleware';

const router = Router();

// Routes
router.get('/user/:id', sessionChecker, userController.getUserById);
router.get('/petsitter/:id', sessionChecker, userController.getPetSitterById);
router.get('/petsitters', sessionChecker, userController.fetchPetSitters);
router.get('/petsitters/filter:filter', sessionChecker, userController.filterPetSitters);

router.get('/verifyToken', sessionChecker, userController.verifyToken);

router.post('/login', userController.login);
router.post('/logout', userController.logout);

router.post('/user', userController.createUser)
router.patch('/user/profile', sessionChecker, userController.updateProfile)
router.patch('/user/pets', sessionChecker, userController.updatePets)
router.patch('/user/addPhotoAlbum', sessionChecker, userController.addPhotoAlbum)
router.delete('/user/deletePhotoAlbum/deleteDataParams:deleteDataParams', sessionChecker, userController.deletePhotoAlbum)
router.patch('/user/createPost', sessionChecker, userController.createPost)
router.delete('/user/deletePost/deleteDataParams:deleteDataParams', sessionChecker, userController.deletePost)

router.patch('/user/petSitter', sessionChecker, userController.updatePetSitter)
router.post('/user/petSitter/availableDate', sessionChecker, userController.createAvailableDate)
router.patch('/user/petSitter/availableDate', sessionChecker, userController.updateAvailableDate)
router.delete('/user/petSitter/availableDates/availableDateParams:availableDateParams', sessionChecker, userController.deleteAvailableDate)

router.post('/booking', sessionChecker, bookingController.createBooking)
router.patch('/booking', sessionChecker, bookingController.updateBookingStatus)

router.post('/rating', sessionChecker, ratingController.createRating)

export default router;
