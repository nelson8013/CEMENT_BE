import dotenv from 'dotenv'
dotenv.config();

import cors         from 'cors'
import session      from 'express-session'
import mongoose     from 'mongoose'
import connection   from './Config/connection.js'
import credentials  from './Middlewares/credentials.js'
import CorsOptions  from './Config/corsOptions.js'
import cookieParser from 'cookie-parser'
import express      from 'express'


import Products     from './Routes/products.js';
import Product      from './Routes/product.js';
import AddProduct   from './Routes/addProduct.js';
import Stores       from './Routes/stores.js';
import Store        from './Routes/store.js';
import AddStore     from './Routes/addStore.js';
import Quantity     from './Routes/storeQuantity.js';
import StoreRep     from './Routes/storeRep.js';
import Users        from './Routes/users.js';
import AddUser      from './Routes/addUser.js';
import Login        from './Routes/login.js';

import Sales        from './Routes/sales.js';
import StoreSales   from './Routes/storeSales.js';
import SalesStore   from './Routes/SalesStore.js';
import Sale         from './Routes/sale.js';
import SaleQuantity from './Routes/saleQuantity.js';
import MakeSale     from './Routes/makeSale.js';


const app  = express()
const PORT = process.env.PORT || 5001;


connection();

app.use(session({secret: process.env.SECRET, resave: true, saveUninitialized: true, cookie: { secure: false }}));
app.use(credentials);
app.use(cors(CorsOptions));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());


/* Products */
app.use("/api/products",       Products);
app.use("/api/product",        Product);
app.use("/api/add-product",    AddProduct);

/* Stores */
app.use("/api/stores",         Stores);
app.use("/api/store",          Store);
app.use("/api/add-store",      AddStore);
app.use("/api/get-store-qty",  Quantity);
app.use("/api/get-store-rep",  StoreRep);


/* Sales */
app.use("/api/sales",          Sales);
app.use("/api/sale",           Sale);
app.use("/api/salesFromStore", StoreSales);
app.use("/api/salesStore",     SalesStore);
app.use("/api/get-sale-qty",   SaleQuantity);
app.use("/api/make-sale",      MakeSale);

/* Users */
app.use("/api/User",           Users);
app.use("/api/add-user",       AddUser);




mongoose.connection.once("open", () => {
 console.log("Database Connected");
 app.listen(PORT, () => {
   console.log(`Neon server running on port ${PORT} 🎉`);
 });
});

