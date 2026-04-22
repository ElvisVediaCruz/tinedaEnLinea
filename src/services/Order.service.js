import sequelize from "../config/conect.js";
import Order from "../models/sequelize/Order.model.js";
import DetailOrder from '../models/sequelize/DetailOrder.model.js';
import Cart from '../models/sequelize/Cart.model.js';
import Product from '../models/sequelize/Product.model.js';

class OrderService {
    async createOrderFromCart(id_user){
        const t = await sequelize.transaction();
        try {
            const carts = await Cart.findAll({
                attributes: ['amount', 'id_cart'],
                where: {
                    id_user: id_user
                },
                include: {
                    model: Product,
                    attributes: ['id_product', 'name', 'price', 'stock']
                },
                transaction: t
            });
            console.log(carts)
            if(carts.length === 0){
                throw new Error("cart is empty")
            }
            const order = await Order.create({
                state: "pendiente",
                id_user: id_user,
                total: 0
            }, { transaction: t });
            let total = 0;
            const detailOrder = [];
            for( const cart of carts ){
                const product = cart.Product;
                if (product.stock < cart.amount) {
                    throw new Error(`Insufficient stock for product ${product.name}`);
                }
                const subTotal = cart.amount * product.price;
                total += subTotal;
                product.stock -= cart.amount;
                await product.save({ transaction: t });
                detailOrder.push({
                    id_order: order.id_order,
                    amount: cart.amount,
                    price_unitary: product.price,
                    id_product: product.id_product
                });
            }
            await DetailOrder.bulkCreate(detailOrder,{ transaction: t });
            await order.update({
                total: total
            }, { transaction: t })
            await Cart.destroy({
                where: {
                    id_user: id_user
                }, 
                transaction: t
            });
            await t.commit();
            return { order, total };
        } catch (error) {
            await t.rollback();
            throw error;
        }
    }
    async getOrderById(id_order){
        const order = await Order.findByPk({
            id_order,
            include: [{
                model: DetailOrder,
                include: Product
            }]
        });
        if(!order) throw new Error("Order not found");
        return order;
    }
    async getOrdersByUser(id_user){
        const orders = await Order.findAll( { 
            where: { id_user : id_user},
            include: [{
                model: "DetailOrder",
                include: "Product"
            }]
        });
        return orders;
    }
}

export default new OrderService();