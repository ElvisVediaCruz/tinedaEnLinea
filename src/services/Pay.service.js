import sequelize from "../config/conect.js";
import Pay from "../models/sequelize/Pay.model.js";
import Order from "../models/sequelize/Order.model.js";

class PayService{
    async payOrder(id_order, method_pos){
        const t = await sequelize.transaction();
        try {
            const order = await Order.findByPk(id_order, { transaction: t, lock: true});
            if(!order) throw new Error("Order not fount");
            if(order.state !== "pendiente") throw new Error("Order already process");
            await Pay.create({
                id_order,
                method_pos,
                amount: order.total
            }, { transaction: t });
            await order.update({
                state: "pagado"
            }, { transaction: t });
            await t.commit();
            return true;
        } catch (error) {
            await t.rollback();
            throw error;
        }
    }
}

export default new PayService();