import express from 'express'
const router = express.Router();
import { createUser } from '../Controllers/UserController.js'



router.post('/', createUser)

export default router
