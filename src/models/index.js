import sequelize from "../config/conect.js";
import User from "./sequelize/User.model.js";
import Product from "./sequelize/Product.model.js";
import Category from "./sequelize/Category.models.js";
import Cart from "./sequelize/Cart.model.js";
import DetailOrder from "./sequelize/DetailOrder.model.js";
import Order from "./sequelize/Order.model.js";
import Pay from "./sequelize/Pay.model.js";

Order.hasOne(Pay, { foreignKey: 'id_order'});
Pay.belongsTo(Order, { foreignKey: 'id_order'});


User.hasMany(Order, { foreignKey: 'id_user'});
Order.belongsTo(User, { foreignKey: 'id_user'});

User.hasMany(Cart, { foreignKey: 'id_user'});
Cart.belongsTo(User, { foreignKey: 'id_user'});

Product.hasMany(Cart, { foreignKey: 'id_product'});
Cart.belongsTo(Product, { foreignKey: 'id_product'});

Order.hasMany(DetailOrder, { foreignKey: 'id_order'});
DetailOrder.belongsTo(Order, { foreignKey: 'id_order'});

Product.hasMany(DetailOrder, { foreignKey: 'id_product'});
DetailOrder.belongsTo(Product, { foreignKey: 'id_product'});

Category.hasMany(Product, { foreignKey: 'id_category'});
Product.belongsTo(Category, { foreignKey: 'id_category'});

const db = {
    sequelize,
    User,
    Product,
    Category,
    Cart,
    DetailOrder,
    Order,
    Pay
};
export default db;