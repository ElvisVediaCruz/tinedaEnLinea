import express from "express";
import ProductController from "../controllers/Product.controller.js";
import { verifyToken } from "../middlewares/jwt.js";
import { isAdmin } from "../middlewares/roles.js";

const router = express.Router();

router.post(
    "/",
    verifyToken,
    isAdmin,
    ProductController.createProduct
);
router.get(
    "/:id_product",
    verifyToken,
    ProductController.getProductById
)
//paginacion por query
router.get(
    "/",
    verifyToken,
    ProductController.getAllProducts
)
router.put(
    "/:id_product",
    verifyToken,
    isAdmin,
    ProductController.updateProduct
);
router.delete(
    "/:id_product",
    verifyToken,
    isAdmin,
    ProductController.deleteProduct
);

export default router;