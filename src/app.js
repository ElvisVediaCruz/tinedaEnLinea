import dotenv from 'dotenv';
import 'dotenv/config';
import path from 'path'
dotenv.config();

import express from 'express';
import db from './models/index.js';

import cartRoute from "./routes/Cart.route.js";

const app = express();


app.use(express.json());

app.use("cart", cartRoute);

async function start(){
    try {
        await db.sequelize.authenticate();
        await db.sequelize.sync({alter: true});
        app.listen(process.env.PORT_SERVER || 3000, ()=> {
            console.log('http://localhost:', process.env.PORT_SERVER);
        })
    } catch (error) {
        console.error('Error:', error);
    }
}

start();