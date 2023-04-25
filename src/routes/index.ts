import { Router } from 'express';
import { user } from '../controllers';

const router = Router();

// Routes
router.get('/user/:id', user.getUserById);
router.get('/petsitter/:id', user.getPetSitterById);
router.get('/login', user.login);
router.get('/petsitters', user.fetchPetSitters);

router.post('/user/create', user.createUser)

export default router;
