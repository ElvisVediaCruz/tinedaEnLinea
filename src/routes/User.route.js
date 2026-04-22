import express from "express";
import UserController from "../controllers/User.constroller.js";
import { verifyToken } from "../middlewares/jwt.js";

const router = express.Router();

router.post(
    "/",
    UserController.register
);
router.post(
    "/login",
    UserController.login
);
router.post(
    "/admin",
    UserController.registerAdmin
)

export default router;