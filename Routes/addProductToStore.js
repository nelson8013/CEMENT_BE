import express from 'express'
const router = express.Router();
import  {updateCementQuantityInStore} from '../Controllers/StoreController.js'


router.get('/:storeId', updateCementQuantityInStore)

export default  router
