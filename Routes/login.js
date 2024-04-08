import express from 'express'
const router = express.Router();
import  {handleLogin} from '../Controllers/AuthenticationController.js'


router.post('/', handleLogin)

export default  router
