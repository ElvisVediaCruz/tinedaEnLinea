import sequelize from '../config/conect.js';
import Cart from '../models/sequelize/Cart.model.js';
import Product from '../models/sequelize/Product.model.js';
import Order from '../models/sequelize/Order.model.js';
import DetailOrder from '../models/sequelize/DetailOrder.model.js';

class CartService {
    async getCart(id_user){
        const carts = await Cart.findAll({ 
            attributes: ['amount', 'id_cart'],
            where: { 
                id_user: id_user
            },
            include: {
                model: Product,
                attributes: ['id_product', 'name', 'price']
            }
        });
        const cartTotal = carts.reduce((total, cart) => {
            const price = cart.Product?.price || 0;
            return total + ( cart.amount * price);
        }, 0);
        return { carts, cartTotal };
    }
    async addToCart(id_user, id_product, amount){
        const t = await sequelize.transaction();
        try {
            const product = await Product.findByPk(id_product, { lock: t.LOCK.UPDATE, transaction: t });
            if(!product) {
                await t.rollback();
                throw new Error("Prodcut not found");
            }
            if(product.stock < amount){
                await t.rollback();
                throw new Error("insuffient stock");
            }
            const existingCart = await Cart.findOne({   
                where: {
                    id_user: id_user,
                    id_product: id_product
                }, transaction: t
            })
            
            if(existingCart){
                const newAmount = existingCart.amount + amount;
                if(newAmount > product.stock){
                    throw new Error("Insufficient stock");
                }
                existingCart.amount = newAmount;
                await existingCart.save({ transaction: t});
                return existingCart;
            }
            const cart = await Cart.create({
                id_user: id_user,
                amount: amount,
                id_product: id_product
            }, { transaction: t});
            await t.commit();
            return cart;   
        } catch (error) {
            await t.rollback();
            throw error;
        }
    }
    async removeFromCart(id_cart){
        const cart = await Cart.findByPk(id_cart);
        if(!cart) {
            throw new Error("Cart item not found");
        }
        await cart.destroy();
        return true;
    }
    async clearCart(id_user){
        const t = await sequelize.transaction();
        try {
            await Cart.destroy({
                where: {
                    id_user: id_user
                }, transaction: t
            })
            await t.commit();
            return true;
        } catch (error) {
            await t.rollback();
            throw error;
        }
        
    }
}

const cartService = new CartService();

export default cartService;