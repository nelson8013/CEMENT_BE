import dotenv from 'dotenv'
dotenv.config();

import cors          from 'cors'
import session       from 'express-session'
import mongoose      from 'mongoose'
import connectMongo  from 'connect-mongo'
import connection    from './Config/connection.js'
import credentials   from './Middlewares/credentials.js'
import CorsOptions   from './Config/corsOptions.js'
import cookieParser  from 'cookie-parser'
import express       from 'express'
import verifyJWT     from './Middlewares/verifyJWT.js'
import sessionConfig from './Config/sessionConfig.js'


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
import Logout       from './Routes/logout.js';

import Sales        from './Routes/sales.js';
import StoreSales   from './Routes/storeSales.js';
import SalesStore   from './Routes/SalesStore.js';
import Sale         from './Routes/sale.js';
import SaleQuantity from './Routes/saleQuantity.js';
import MakeSale     from './Routes/makeSale.js';
import AddProductToStore from './Routes/addProductToStore.js'


const app  = express()
const PORT = process.env.PORT || 5001;


connection();


app.use(session(sessionConfig(process.env.SECRET, process.env.CEMENT_SESSION_STORE_URI)));
app.use(credentials);
app.use(cors(CorsOptions));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());


/* Products */
app.use("/api/products",          verifyJWT, Products);
app.use("/api/product",           verifyJWT, Product);
app.use("/api/add-product",       verifyJWT, AddProduct);

/* Stores */
app.use("/api/stores",            verifyJWT, Stores);
app.use("/api/store",             verifyJWT, Store);
app.use("/api/add-store",         verifyJWT, AddStore);
app.use("/api/get-store-qty",     verifyJWT, Quantity);
app.use("/api/get-store-rep",     verifyJWT, StoreRep);
app.use("/api/addProductToStore", verifyJWT, AddProductToStore);


/* Sales */
app.use("/api/sales",             verifyJWT, Sales);
app.use("/api/sale",              verifyJWT, Sale);
app.use("/api/salesFromStore",    verifyJWT, StoreSales);
app.use("/api/salesStore",        verifyJWT, SalesStore);
app.use("/api/get-sale-qty",      verifyJWT, SaleQuantity);
app.use("/api/make-sale",         verifyJWT, MakeSale);


/* Authentication */
app.use("/api/login", Login)
app.use("/api/logout",  Logout)



/* Users */
app.use("/api/User",          verifyJWT, Users);
app.use("/api/add-user",       AddUser);




mongoose.connection.once("open", () => {
 console.log("Database Connected");
 app.listen(PORT, () => {
   console.log(`Neon server running on port ${PORT} 🎉`);
 });
});

