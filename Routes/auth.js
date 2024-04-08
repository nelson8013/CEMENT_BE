import express from 'express'
const router = express.Router();
import  {handleLogin, handleLogout} from '../Controllers/AuthenticationController.js'


router.post('/', handleLogin)
router.post('/', handleLogout)

export default  router
