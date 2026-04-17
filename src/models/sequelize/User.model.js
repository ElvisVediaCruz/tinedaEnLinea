import { DataTypes, Model, Sequelize } from "sequelize";
import sequelize from "../../config/conect.js";

class User extends Model {
}

User.init({
    id_user: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    last_name:{
        type:DataTypes.STRING,
        allowNull: false
    },
    email:{
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    user_name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    }
}, {
    sequelize,
    modelName: 'User',
    tableName: 'users',
    timestamps: false
})

export default User;

// Setter = modifica antes de guardar
//Getter = modifica antes de mostrar