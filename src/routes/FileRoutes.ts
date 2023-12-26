import { Router } from "express";
import { FileController } from "../controllers/FileController";

const fileRoutes = Router();

// fileRoutes.get("/File/all", FileController.getAllFiles); // don't want to make the system crash with only one request!
fileRoutes.get("/File/:id", FileController.getFileById);

fileRoutes.post("/File/query", FileController.getFileByFilter);
fileRoutes.post("/File/create", FileController.createFile);
fileRoutes.post("/File/update", FileController.updateFile);
fileRoutes.post("/File/delete", FileController.deleteFile);

export { fileRoutes };
