import express from 'express'
const router = express.Router();
import { getSalesRep } from '../Controllers/StoreController.js'



router.get('/:storeId', getSalesRep)

export default router
