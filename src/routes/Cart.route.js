import express from "express";
import cartController from "../controllers/Cart.controllers";

const router = express.Router();

router.post("/", 
    cartController.addToCart()
)
router.get("/",
    cartController.getCart()
)
router.delete("/",
    cartController.removeFromCart()
)
router.delete("/clear",
    cartController.clearCart()
)

export default router;