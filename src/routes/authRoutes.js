const express=require('express');
const router = express.Router();
const passport = require('../Auth/Passport');
const {authcontroller}=require('../Controllers');
const authmiddleware=require('../middlewares/validators');

router.post('/SignUP',authmiddleware.validateSignUP,authcontroller.createUser);
router.post('/SignIN', authmiddleware.validateSignIN, authcontroller.userLogin);
router.get(
  '/auth/google',
  passport.authenticate('google', {
    scope: ['profile', 'email']
  })
);

router.get(
  '/auth/google/callback',
  passport.authenticate('google', { session: false }),
  (req, res) => {
    res.json({ token: req.user.token });
  }
);



module.exports = router;
