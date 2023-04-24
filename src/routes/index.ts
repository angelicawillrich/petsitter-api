import { Router } from 'express';
import { getUserById, getPetSitterById, login, fetchPetSitters } from '../controllers';

const router = Router();

// Routes
router.get('/user/:id', getUserById);
router.get('/petsitter/:id', getPetSitterById);
router.get('/login', login);
router.get('/petsitters', fetchPetSitters);

export default router;
