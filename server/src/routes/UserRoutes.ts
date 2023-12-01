import { Router } from "express";
import { UserController } from "../controllers/UserController";

const userRoutes = Router();

userRoutes.get("/User", UserController.getAllUsers);
userRoutes.get("/User/:id", UserController.getUserById);

export { userRoutes };
