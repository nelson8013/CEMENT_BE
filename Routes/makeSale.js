import express from 'express'
const router = express.Router();
import { createSale } from '../Controllers/SalesController.js'



router.post('/', createSale)

export default router
