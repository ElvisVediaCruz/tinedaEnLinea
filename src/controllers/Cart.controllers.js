import cartService from "../services/Cart.service.js";
class CartController {
    async addToCart(req, res) {
        //id_product se obtendra de JWT
        const { id_user, id_product, amount } = req.body;
        try {
            const cart = await cartService.addToCart(id_user, id_product, amount);
            res.json(cart);
        } catch (error) {
            return res.status(400).json({ error: error.message });
        }
    }
    async getCart(req, res) {
        const { id_user} = req.body;
        try {
            const cart = await cartService.getCart(id_user);
            res.json(cart);
        } catch (error) {
            return res.status(400).json({ error: error.message });
        }
    }
    async removeFromCart(req, res) {
        const { id_cart } = req.body;
        try {
            const result = await cartService.removeFromCart(id_cart);
            res.json(result);
        } catch (error) {
            return res.status(400).json({ error: error.message });
        }
    }
    async clearCart(req, res) {
        const { id_user } = req.body;
        try {
            const result = await cartService.clearCart(id_user);
            res.json(result);
        } catch (error) {
            return res.status(400).json({ error: error.message });
        }
    }
}
const cartController = new CartController();

export default cartController;