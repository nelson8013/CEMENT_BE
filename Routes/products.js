import express from 'express'
const router = express.Router();
import { products } from '../Controllers/ProductController.js'



router.get('/', products)

export default router
