const express=require('express');
const router = express.Router();

const validateTweet=require('../middlewares/validatetweet');
const TweetController=require('../Controllers/tweetcontroller');

router.post('/',validateTweet.validateTweet,TweetController.createTweet);
router.get('/:id',validateTweet.validategetTweet,TweetController.getTweet);

// Export the router so the main routes page can use it
module.exports = TweetRoutes = router;