import express from 'express'
const router = express.Router();
import  {product} from '../Controllers/ProductController.js'


router.get('/:productId', product)

export default  router
