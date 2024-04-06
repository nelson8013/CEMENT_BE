import express from 'express'
const router = express.Router();
import  {getSales} from '../Controllers/SalesController.js'


router.get('/', getSales)

export default  router
