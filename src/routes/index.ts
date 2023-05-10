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

router.post('/user/create', userController.createUser)
router.post('/user/profile', sessionChecker, userController.updateProfile)
router.post('/user/pets', sessionChecker, userController.updatePets)
router.post('/user/addPhotoAlbum', sessionChecker, userController.addPhotoAlbum)
router.post('/user/deletePhotoAlbum', sessionChecker, userController.deletePhotoAlbum)
router.post('/user/createPost', sessionChecker, userController.createPost)
router.post('/user/deletePost', sessionChecker, userController.deletePost)

router.post('/petSitter', sessionChecker, userController.updatePetSitter)
router.post('/petSitter/availableDates', sessionChecker, userController.updatePetSitterAvailableDates)

router.post('/booking/create', sessionChecker, bookingController.createBooking)
router.post('/booking/update', sessionChecker, bookingController.updateBookingStatus)

router.post('/rating/create', sessionChecker, ratingController.createRating)

export default router;
