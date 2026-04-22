import express from "express";
import PayController from "../controllers/Pay.controller.js";
import { verifyToken } from "../middlewares/jwt.js";

const router = express.Router();

//revisar
router.post(
    "/:id_order/:method_pos",
    verifyToken,
    PayController.payOrder
)

export default router;