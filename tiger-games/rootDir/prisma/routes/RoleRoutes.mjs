import { Router } from 'express';
import { RoleController } from '../controllers/RoleController.mjs';

const roleRoutes = Router();

roleRoutes.get('/roles', RoleController.getAllRoles());
// userRoutes.get('/users/:id', UserController.getUserById);

export { roleRoutes };