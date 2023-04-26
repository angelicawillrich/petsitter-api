import { Router } from 'express';
import { booking, user, rating } from '../controllers';

const router = Router();

// Routes
router.get('/user/:id', user.getUserById);
router.get('/petsitter/:id', user.getPetSitterById);
router.get('/login', user.login);
router.get('/petsitters', user.fetchPetSitters);

router.post('/user/create', user.createUser)
router.post('/user/personalInfo', user.updatePersonalInfo)
router.post('/user/pets', user.updatePets)
router.post('/user/petSitter', user.updatePetSitter)
router.post('/user/petSitter/availableDates', user.updatePetSitterAvailableDates)

router.post('/booking/create', booking.createBooking)
router.post('/booking/update', booking.updateBookingStatus)

router.post('/rating/create', rating.createRating)

export default router;
