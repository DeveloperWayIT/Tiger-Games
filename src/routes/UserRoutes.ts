import { Router } from "express";
import { UserController } from "../controllers/UserController";

const userRoutes = Router();

userRoutes.get("/User/all", UserController.getAllUsers);
userRoutes.get("/User/:id", UserController.getUserById);

userRoutes.post("/User/query", UserController.getUserByFilter);
userRoutes.post("/User/create", UserController.createUser);
userRoutes.post("/User/update", UserController.updateUser);
userRoutes.post("/User/delete", UserController.deleteUser);

export { userRoutes };
