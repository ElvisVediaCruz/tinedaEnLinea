import CartService from "../services/Cart.service.js";
class CartController {
    async addToCart(req, res) {
        const id_user = req.user.id_user;
        const { id_product, amount } = req.body;
        try {
            const cart = await CartService.addToCart(id_user, id_product, amount);
            res.json(cart);
        } catch (error) {
            console.log(error);
            return res.status(400).json({ error: error.message });
        }
    }
    async getCart(req, res) {
        const id_user = req.user.id_user;
        try {
            const cart = await CartService.getCart(id_user);
            res.json(cart);
        } catch (error) {
            return res.status(400).json({ error: error.message });
        }
    }
    async removeFromCart(req, res) {
        const { id_cart } = req.params;
        try {
            const result = await CartService.removeFromCart(id_cart);
            res.json(result);
        } catch (error) {
            return res.status(400).json({ error: error.message });
        }
    }
    async clearCart(req, res) {
        const id_user = req.user.id_user;
        try {
            const result = await CartService.clearCart(id_user);
            res.json(result);
        } catch (error) {
            return res.status(400).json({ error: error.message });
        }
    }
}
const cartController = new CartController();

export default cartController;