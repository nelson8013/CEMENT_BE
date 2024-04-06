import dotenv from 'dotenv'
dotenv.config();

import cors from 'cors'
import session from 'express-session'
import mongoose  from 'mongoose'
import connection  from './Config/connection.js'
import credentials  from './Middlewares/credentials.js'
import CorsOptions  from './Config/corsOptions.js'
import cookieParser from 'cookie-parser'
import express from 'express'


import Products from './Routes/products.js';
import Product from './Routes/product.js';
import AddProduct from './Routes/addProduct.js';
import Store from './Routes/addStore.js';
import Quantity from './Routes/storeQuantity.js';
import Users from './Routes/users.js';
import AddUser from './Routes/addUser.js';
import Login from './Routes/login.js';


const app  = express()
const PORT = process.env.PORT || 5001;


connection();

app.use(session({secret: process.env.SECRET, resave: true, saveUninitialized: true, cookie: { secure: false }}));
app.use(credentials);
app.use(cors(CorsOptions));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());



app.use("/api/products",       Products);
app.use("/api/product",        Product);
app.use("/api/add-product",    AddProduct);

app.use("/api/add-store",      Store);
app.use("/api/get-store-qty",  Quantity);

app.use("/api/User",           Users);
app.use("/api/add-user",       AddUser);




mongoose.connection.once("open", () => {
 console.log("Database Connected");
 app.listen(PORT, () => {
   console.log(`Neon server running on port ${PORT} 🎉`);
 });
});

