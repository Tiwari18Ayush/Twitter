const likeService=require('../Services/Like-Service');
const asyncWrapper=require('../utils/common/wrapper');
const SuccessResponse=require('../utils/common/SuccessResponse');

const toggleTweetLike = asyncWrapper(async (req, res) => {
  const userId = req.user.id;
  const tweetId = req.params.tweetId;

  const result = await likeService.toggleLike(
    userId,
    tweetId,
    'Tweet'
  );

  SuccessResponse.data = result;
  SuccessResponse.message = result.liked ? 'Liked' : 'Unliked';

  return res.status(200).json(SuccessResponse);
});


module.exports = {
    toggleTweetLike
};