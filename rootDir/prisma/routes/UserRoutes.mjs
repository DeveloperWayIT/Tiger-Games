import { Router } from 'express';
import { UserController } from '../controllers/UserController.mjs';

const userRoutes = Router();

userRoutes.get('/users', UserController.getAllUsers);
// userRoutes.get('/users/:id', UserController.getUserById);

export { userRoutes };