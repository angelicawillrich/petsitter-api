import { Router } from 'express';
import { getUserById } from '../controllers';

const router = Router();

// Rotas
router.get('/user/:id', getUserById);

export default router;
