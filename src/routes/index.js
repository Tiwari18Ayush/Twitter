const express=require('express');
const router = express.Router();
const TweetRoutes=require('./TweetRoutes');

router.use('/tweet',TweetRoutes);
router.use('/twitter-auth',require('./authRoutes'));

module.exports=router;