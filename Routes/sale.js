import express from 'express'
const router = express.Router();
import  {getSale} from '../Controllers/SalesController.js'


router.get('/:salesId', getSale)

export default  router
