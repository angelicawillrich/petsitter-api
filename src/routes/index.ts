import { Router } from 'express';
import { getUserById } from '../controllers';
import { getPetSitterById } from '../controllers';

const router = Router();

// Routes
router.get('/user/:id', getUserById);
router.get('/petsitter/:id', getPetSitterById);

export default router;
