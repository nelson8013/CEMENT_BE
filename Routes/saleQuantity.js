import express from 'express'
const router = express.Router();
import  {getSaleQuantity} from '../Controllers/SalesController.js'


router.get('/:salesId', getSaleQuantity)

export default  router
