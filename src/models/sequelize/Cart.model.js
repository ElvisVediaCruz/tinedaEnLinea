import { DataTypes, Model, Sequelize } from "sequelize";
import sequelize from "../../config/conect.js";

class Cart extends Model{};

Cart.init({
    id_cart: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    amount: {
        type: DataTypes.FLOAT,
        allowNull: false
    }
},{
    sequelize,
    modelName: 'Cart',
    tableName: 'carts',
    timestamps: false
})

export default Cart;