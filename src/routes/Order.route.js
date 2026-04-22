import express from "express";
import OrderController from "../controllers/Order.controller.js";
import { verifyToken } from "../middlewares/jwt.js";

const router = express.Router();

router.post(
    "/",
    verifyToken,
    OrderController.createOrderFromCart
);
router.get(
    "/:id_order",
    verifyToken,
    OrderController.getOrderById
);
//revisar
router.get(
    "/",
    verifyToken,
    OrderController.getOrdersByUser
);

export default router;