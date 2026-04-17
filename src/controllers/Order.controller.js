import OrderService from "../services/Order.service.js";

class OrderController{
    async createOrderFromCart(req, res){
        const { id_user } = req.body;
        try {
            const result = await OrderService.createOrderFromCart(id_user);
            res.json(result);
        } catch (error) {
            return res.status(400).json({ error: error.message });
        }
    }
    async getOrderById(req, res){
        const { id_order } = req.params;
        try {
            const result = await OrderService.getOrderById(id_order)
            res.json(result);
        } catch (error) {
            return res.status(400).json({ error: error.message });
        }
    }
    async getOrdersByUser(req, res){
        const { id_user } = req.params;
        try {
            const results = await OrderService.getOrdersByUser(id_user);
            res.json(results);
        } catch (error) {
            return res.status(400).json({ error: error.message });
        }
    }
}

export default new OrderController();