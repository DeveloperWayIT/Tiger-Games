import { Router } from "express";
import { CartController } from "../controllers/CartController";

const cartRoutes = Router();

cartRoutes.get("/Cart/all", CartController.getAllCarts);
cartRoutes.get("/Cart/:id", CartController.getCartById);

cartRoutes.post("/Cart/query", CartController.getCartByFilter);
cartRoutes.post("/Cart/create", CartController.createCart);
cartRoutes.post("/Cart/update", CartController.updateCart);
cartRoutes.post("/Cart/delete", CartController.deleteCart);

export { cartRoutes };
