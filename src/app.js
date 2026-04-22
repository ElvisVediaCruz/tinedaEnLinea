import dotenv from 'dotenv';
import 'dotenv/config';
import path from 'path'
dotenv.config();

import express from 'express';
import db from './models/index.js';

import CartRoute from "./routes/Cart.route.js";
import OrderRoute from "./routes/Order.route.js";
import PayRoute from "./routes/Pay.route.js";
import UserRoute from "./routes/User.route.js";
import CategoryRoute from "./routes/Category.route.js";
import ProductRoute from "./routes/Product.route.js";

const app = express();

app.use(express.json());

app.use("/api/cart", CartRoute);
app.use("/api/order", OrderRoute);
app.use("/api/pay", PayRoute);
app.use("/api/user", UserRoute);
app.use("/api/product", ProductRoute);
app.use("/api/Categories", CategoryRoute);

async function start(){
    try {
        await db.sequelize.authenticate();
        //force
        await db.sequelize.sync({alter: true});
        app.listen(process.env.PORT_SERVER || 3000, ()=> {
            console.log('http://localhost:', process.env.PORT_SERVER);
        })
    } catch (error) {
        console.error('Error:', error);
    }
}

start();