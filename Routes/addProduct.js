import express from 'express'
const router = express.Router();
import { createProduct } from '../Controllers/ProductController.js'



router.post('/', createProduct)

export default router
