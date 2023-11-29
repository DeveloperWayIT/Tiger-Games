import { Router } from 'express';
import { RoleController } from '../controllers/RoleController.mjs';

const roleRoutes = Router();

roleRoutes.get('/Role', RoleController.getAllRoles);
roleRoutes.get('/Role/:id', RoleController.getRoleById);

export { roleRoutes };