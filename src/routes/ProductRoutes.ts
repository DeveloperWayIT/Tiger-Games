import { Router } from "express";
import { ProductController } from "../controllers/ProductController";

const productRoutes = Router();

productRoutes.get("/Product/all", ProductController.getAllProducts);
productRoutes.get("/Product/:id", ProductController.getProductById);

productRoutes.post("/Product/query", ProductController.getProductByFilter);
productRoutes.post("/Product/create", ProductController.createProduct);
productRoutes.post("/Product/update", ProductController.updateProduct);
productRoutes.post("/Product/delete", ProductController.deleteProduct);

export { productRoutes };
