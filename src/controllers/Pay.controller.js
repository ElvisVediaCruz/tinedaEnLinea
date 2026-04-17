import PayService from "../services/Pay.service.js";

class PayController {
    async payOrder(req, res){
        const { id_order, method_pos} = req.body;
        try {
            const payOrder = await PayService.payOrder(id_order, method_pos);
            res.json(payOrder)
        } catch (error) {
            return res.status(400).json({ error: error.message });
        }
    }
}

export default new PayController();