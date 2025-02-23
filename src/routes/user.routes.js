import {Router} from "express"
const router=Router();
import {createUser} from '../controllers/user.controller.js'


router.route('/create-a-user').post(createUser)

export default router;