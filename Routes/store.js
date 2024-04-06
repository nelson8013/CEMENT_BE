import express from 'express'
const router = express.Router();
import  {getStore} from '../Controllers/StoreController.js'


router.get('/:storeId', getStore)

export default  router
