const express = require('express');
const router = express.Router();
const passport = require('../Auth/Passport');
const validateTweet = require('../middlewares/validatetweet');
const TweetController = require('../Controllers/tweetcontroller');
const likecontroller = require('../Controllers/likecontroller');
const commentController=require('../Controllers/commentcontroller')
/* ---------------- TWEETS ---------------- */

// create tweet
router.post(
  '/',
 passport.authenticate('jwt', { session: false }),
  validateTweet.validateTweet,
  TweetController.createTweet
);

// get tweet
router.get(
  '/:tweetId',
  validateTweet.validategetTweet,
  TweetController.getTweet
);


/* ---------------- LIKES (Tweet specific) ---------------- */

// toggle like
router.post(
  '/:tweetId/like',
   passport.authenticate('jwt', { session: false }),
  likecontroller.toggleTweetLike
);

// // count likes
// router.get(
//   '/:tweetId/likes/count',
//   likecontroller.getTweetLikeCount
// );
/* ---------------- COMMENTS ROUTES ---------------- */

router.post(
  '/:tweetId/comment',
  passport.authenticate('jwt', { session: false }),
  commentController.createTweetComment
);

router.get(
  '/:tweetId/comments',
  commentController.getTweetComments
);
router.delete(
  '/:tweetId/comment',
  passport.authenticate('jwt', { session: false }),
  commentController.deleteComment
);

module.exports = router;
