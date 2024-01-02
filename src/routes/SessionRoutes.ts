import { Router } from "express";
import { SessionController } from "../controllers/SessionController";

const sessionRoutes = Router();

sessionRoutes.get("/Session/all", SessionController.getAllSessions);
sessionRoutes.get("/Session/:id", SessionController.getSessionById);

sessionRoutes.post("/Session/query", SessionController.getSessionByFilter);
sessionRoutes.post("/Session/create", SessionController.createSession);
sessionRoutes.post("/Session/update", SessionController.updateSession);
sessionRoutes.post("/Session/delete", SessionController.deleteSession);

export { sessionRoutes };
