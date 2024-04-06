import express from 'express'
const router = express.Router();
import  {findSaleStore} from '../Controllers/SalesController.js'


router.get('/:salesId', findSaleStore)

export default  router
