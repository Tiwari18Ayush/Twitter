const LikeRepository = require('../Repository/Like-Repository');
const TweetRepository = require('../Repository/Tweet-Repository');
const AppError = require('../utils/Errors/AppError');
const { StatusCodes } = require('http-status-codes');

const likeRepository = new LikeRepository();
const tweetRepository = new TweetRepository();


async function toggleLike(userId, likeableId, onModel) {

  const existingLike = await likeRepository.findByUserAndLikeable({
    user: userId,
    likeable: likeableId,
    onModel
  });

  // =========================
  // UNLIKE
  // =========================
  if (existingLike) {

    await likeRepository.delete(existingLike._id);

    // ⭐ decrement cached counter
    if (onModel === 'Tweet') {
      await tweetRepository.incrementLikes(likeableId, -1);
    }

    return { liked: false };
  }

  // =========================
  // LIKE
  // =========================
  await likeRepository.create({
    user: userId,
    likeable: likeableId,
    onModel
  });

  // ⭐ increment cached counter
  if (onModel === 'Tweet') {
    await tweetRepository.incrementLikes(likeableId, 1);
  }

  return { liked: true };
}


async function countLikes(likeableId, onModel) {
  return likeRepository.count({
    likeable: likeableId,
    onModel
  });
}


async function isLiked(userId, likeableId, onModel) {
  return likeRepository.findByUserAndLikeable({
    user: userId,
    likeable: likeableId,
    onModel
  });
}


module.exports = {
  toggleLike,
  countLikes,
  isLiked
};
