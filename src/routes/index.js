const express=require('express');
const router = express.Router();
const TweetRoutes=require('./TweetRoutes');

router.use('/tweet',TweetRoutes);

module.exports=router;