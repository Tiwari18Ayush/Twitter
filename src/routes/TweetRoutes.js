const express = require('express');
const router = express.Router();

const validateTweet = require('../middlewares/validatetweet');
const TweetController = require('../Controllers/tweetcontroller');
const authmiddleware = require('../middlewares/authmiddleware');
const likecontroller = require('../Controllers/likecontroller');

/* ---------------- TWEETS ---------------- */

// create tweet
router.post(
  '/',
  authmiddleware.authenticate,
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
  authmiddleware.authenticate,
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
 authmiddleware.authenticate,
  commentController.createTweetComment
);

router.get(
  '/:tweetId/comments',
  commentController.getTweetComments
);

module.exports = router;
