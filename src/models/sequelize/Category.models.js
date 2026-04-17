import { DataTypes, Model, Sequelize } from "sequelize";
import sequelize from "../../config/conect.js";

class Category extends Model{};

Category.init({
    id_category: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    }
},{
    sequelize,
    modelName: 'Category',
    tableName: 'categories',
    timestamps: false
})

export default Category;