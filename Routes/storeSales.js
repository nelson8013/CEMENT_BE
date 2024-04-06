import express from 'express'
const router = express.Router();
import  {salesFromAStore} from '../Controllers/SalesController.js'


router.get('/:storeId', salesFromAStore)

export default  router
