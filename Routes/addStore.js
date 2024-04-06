import express from 'express'
const router = express.Router();
import { createStore } from '../Controllers/StoreController.js'



router.post('/', createStore)

export default router
