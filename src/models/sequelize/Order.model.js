import { DataTypes, Model, Sequelize } from "sequelize";
import sequelize from "../../config/conect.js";

class Order extends Model{};

Order.init({
    id_order: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    state: {
        type: DataTypes.STRING,
        allowNull: false
    },
    date: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: DataTypes.NOW
    },
    total: {
        type: DataTypes.FLOAT,
        allowNull: true
    }
},{
    sequelize,
    modelName: 'Order',
    tableName: 'orders',
    timestamps: false
})

export default Order;