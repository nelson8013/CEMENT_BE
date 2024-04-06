import express from 'express'
const router = express.Router();
import  {getStores} from '../Controllers/StoreController.js'


router.get('/', getStores)

export default  router
