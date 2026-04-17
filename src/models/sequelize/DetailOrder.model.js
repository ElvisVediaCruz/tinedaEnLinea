import { DataTypes, Model, Sequelize } from "sequelize";
import sequelize from "../../config/conect.js";

class DetailOrder extends Model{};

DetailOrder.init({
    id_detail_order: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    amount: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    price_unitary: {
        type: DataTypes.FLOAT,
        allowNull: false
    }
},{
    sequelize,
    modelName: 'DetailOrder',
    tableName: 'detail_orders',
    timestamps: false
})

export default DetailOrder;