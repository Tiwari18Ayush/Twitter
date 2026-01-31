const express=require('express');
const router = express.Router();

const {authcontroller}=require('../Controllers');
const authmiddleware=require('../middlewares/authmiddleware');

router.post('/SignUP',authmiddleware.validateSignUP,authcontroller.createUser);
router.post('/SignIN', authmiddleware.validateSignIN, authcontroller.userLogin);


module.exports = AuthRoutes = router;