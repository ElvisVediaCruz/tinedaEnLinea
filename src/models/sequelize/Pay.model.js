import { DataTypes, Model, Sequelize } from "sequelize";
import sequelize from "../../config/conect.js";

class Pay extends Model{}

Pay.init({
    id_pay: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: true

    },
    method_pos: {
        type: DataTypes.STRING,
        allowNull: false
    },
    amount: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    date: {
        type: DataTypes.DATE,
        allowNull: false
    }
}, {
    sequelize,
    modelName: 'Pay',
    tableName: 'pays',
    timestamps: false
});

export default Pay;