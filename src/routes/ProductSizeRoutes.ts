import { Router } from "express";
import { ProductSizeController } from "../controllers/ProductSizeController";

const productSizeRoutes = Router();

productSizeRoutes.get("/ProductSize/all", ProductSizeController.getAllProductSizes);
productSizeRoutes.get("/ProductSize/:id", ProductSizeController.getProductSizeById);

productSizeRoutes.post("/ProductSize/query", ProductSizeController.getProductSizeByFilter);
productSizeRoutes.post("/ProductSize/create", ProductSizeController.createProductSize);
productSizeRoutes.post("/ProductSize/update", ProductSizeController.updateProductSize);
productSizeRoutes.post("/ProductSize/delete", ProductSizeController.deleteProductSize);

export { productSizeRoutes };
