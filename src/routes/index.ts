import { Router } from 'express';
import { bookingController, userController, ratingController } from '../controllers';
import sessionChecker from '../middlewares/sessions/sessions.middleware';

const router = Router();

// Routes
router.get('/user/:id', sessionChecker, userController.getUserById);
router.get('/petsitter/:id', sessionChecker, userController.getPetSitterById);
router.get('/petsitters', sessionChecker, userController.fetchPetSitters);

router.post('/login', userController.login);
router.post('/logout', userController.logout);

router.post('/user/create', userController.createUser)
router.post('/user/personalInfo', sessionChecker, userController.updatePersonalInfo)
router.post('/user/pets', sessionChecker, userController.updatePets)
router.post('/user/petSitter', sessionChecker, userController.updatePetSitter)
router.post('/user/petSitter/availableDates', sessionChecker, userController.updatePetSitterAvailableDates)

router.post('/booking/create', sessionChecker, bookingController.createBooking)
router.post('/booking/update', sessionChecker, bookingController.updateBookingStatus)

router.post('/rating/create', sessionChecker, ratingController.createRating)

export default router;
