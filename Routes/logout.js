import express from 'express'
const router = express.Router();
import  {handleLogout} from '../Controllers/AuthenticationController.js'


router.post('/', handleLogout)

export default  router
