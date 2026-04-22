import express from "express";
import cartController from "../controllers/Cart.controller.js";
import { verifyToken } from "../middlewares/jwt.js";

const router = express.Router();

router.get(
    "/",
    verifyToken,
    cartController.getCart
);
router.post(
    "/",
    verifyToken,
    cartController.addToCart
);
router.delete(
    "/:id_cart",
    verifyToken,
    cartController.removeFromCart
);
router.delete(
    "/",
    verifyToken,
    cartController.clearCart
)

export default router;