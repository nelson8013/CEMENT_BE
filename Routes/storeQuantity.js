import express from 'express'
const router = express.Router();
import { getAvailableCementQuantityInStore } from '../Controllers/StoreController.js'



router.get('/:storeId', getAvailableCementQuantityInStore)

export default router
