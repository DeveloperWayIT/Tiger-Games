import { Router } from "express";
import { AddressController } from "../controllers/AddressController";

const addressRoutes = Router();

addressRoutes.get("/Address/all", AddressController.getAllAddresss);
addressRoutes.get("/Address/:id", AddressController.getAddressById);

addressRoutes.post("/Address/query", AddressController.getAddressByFilter);
addressRoutes.post("/Address/create", AddressController.createAddress);
addressRoutes.post("/Address/update", AddressController.updateAddress);
addressRoutes.post("/Address/delete", AddressController.deleteAddress);

export { addressRoutes };
