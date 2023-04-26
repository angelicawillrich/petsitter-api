import { Router } from 'express';
import { bookingController, userController, ratingController } from '../controllers';

const router = Router();

// Routes
router.get('/user/:id', userController.getUserById);
router.get('/petsitter/:id', userController.getPetSitterById);
router.get('/login', userController.login);
router.get('/petsitters', userController.fetchPetSitters);

router.post('/user/create', userController.createUser)
router.post('/user/personalInfo', userController.updatePersonalInfo)
router.post('/user/pets', userController.updatePets)
router.post('/user/petSitter', userController.updatePetSitter)
router.post('/user/petSitter/availableDates', userController.updatePetSitterAvailableDates)

router.post('/booking/create', bookingController.createBooking)
router.post('/booking/update', bookingController.updateBookingStatus)

router.post('/rating/create', ratingController.createRating)

export default router;
