import { Router } from 'express';
import { getUserById, getPetSitterById, login } from '../controllers';

const router = Router();

// Routes
router.get('/user/:id', getUserById);
router.get('/petsitter/:id', getPetSitterById);
router.get('/login', login);

export default router;
