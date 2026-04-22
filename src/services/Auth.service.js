import User from "../models/sequelize/User.model.js";
import { Op } from "sequelize";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import fs from "fs";


const privateKey = fs.readFileSync(process.env.PRIVATE_KEY_PATH, "utf-8");
class UserService{
    #saltRounds = 10;
    
    async register(name, last_name, email, password, user_name, type = "user"){
        const user = await User.findOne({
            where: {
                [Op.or]: [
                    {user_name: user_name},
                    {email: email}
                ]
            }
        });
        if(user) throw new Error("User already exists");
        const passwordHash = await bcrypt.hash(password, this.#saltRounds);
        const newUser = await User.create({
            name: name,
            last_name: last_name,
            email: email,
            user_name: user_name,
            password: passwordHash,
            type: type
        });
        return { 
            name: newUser.name,
            last_name: newUser.last_name,
            email: newUser.email,
            user_name: newUser.user_name
        };
    }
    async login(user_name, password){
        const user = await User.findOne({
            where: { user_name: user_name},
            attributes: ["id_user", "password", "user_name", "type"]
        })
        if(!user) throw new Error("Invalid credentials");
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
           throw new Error("Invalid credentials");
        }
        const token = jwt.sign(
            {id_user: user.id_user, user_name: user.user_name, type: user.type}, 
            privateKey, 
            {expiresIn: "1h", algorithm: "RS256" })
        return {
            token,
            user: {
                id_user: user.id_user,
                user_name: user.user_name,
                type: user.type
            }
        };
    }
}

export default new UserService();