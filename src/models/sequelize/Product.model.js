import { DataTypes, Model,Sequelize } from "sequelize";
import sequelize from "../../config/conect.js";

class Product extends Model{};

Product.init({
    id_product: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.STRING,
    },
    price: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    stock: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
},{
    sequelize,
    modelName: 'Product',
    tableName: 'Products',
    timestamps: false
});

export default Product;