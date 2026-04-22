import express from "express";
import CategoryController from "../controllers/Category.controller.js";
import { verifyToken } from "../middlewares/jwt.js"
import { isAdmin } from "../middlewares/roles.js";

const router = express.Router();

router.post(
    "/",
    verifyToken,
    isAdmin,
    CategoryController.createCategory
);
router.get(
    "/:id_category",
    verifyToken,
    CategoryController.findCategory
);
router.get(
    "/",
    verifyToken,
    CategoryController.findAllCategory
);
router.put(
    "/:id_category",
    verifyToken,
    isAdmin,
    CategoryController.updateCategory
);
router.delete(
    "/:id_category",
    verifyToken,
    isAdmin,
    CategoryController.deleteCategory
);

export default router;