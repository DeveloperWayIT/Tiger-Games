import { Router } from "express";
import { RoleController } from "../controllers/RoleController";

const roleRoutes = Router();

roleRoutes.get("/Role/all", RoleController.getAllRoles);
roleRoutes.get("/Role/:id", RoleController.getRoleById);

roleRoutes.post("/Role/query", RoleController.getRoleByFilter);
roleRoutes.post("/Role/create", RoleController.createRole);
roleRoutes.post("/Role/update", RoleController.updateRole);
roleRoutes.post("/Role/delete", RoleController.deleteRole);

export { roleRoutes };
