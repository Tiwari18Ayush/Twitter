const AppError = require('../utils/Errors/AppError');
const { StatusCodes } = require('http-status-codes');

function validateTweet(req, res, next) {
  const { content } = req.body;

  const file = req.file;

  // =============================
  // 1️⃣ Require at least text or image
  // =============================
  if ((!content || content.trim().length === 0) && !file) {
    return next(
      new AppError(
        'Tweet must have content or an image',
        StatusCodes.BAD_REQUEST
      )
    );
  }

  // =============================
  // 2️⃣ Validate image type (if provided)
  // =============================
  if (file) {
    const allowedTypes = ['image/png', 'image/jpeg', 'image/jpg', 'image/webp'];

    if (!allowedTypes.includes(file.mimetype)) {
      return next(
        new AppError(
          'Only PNG, JPG, JPEG, WEBP images allowed',
          StatusCodes.BAD_REQUEST
        )
      );
    }
  }

  next();
}

function validateGetTweet(req, res, next) {
  const { tweetId } = req.params;

  if (!tweetId) {
    return next(
      new AppError(
        'Tweet id is required',
        StatusCodes.BAD_REQUEST
      )
    );
  }

  next();
}

module.exports = {
  validateTweet,
  validateGetTweet
};
