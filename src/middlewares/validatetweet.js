const AppError = require('../utils/Errors/AppError');
const { StatusCodes } = require('http-status-codes');
function validateTweet(req, res, next) {
  const { content } = req.body;

  if (!content || content.trim().length === 0) {
    return next(
      new AppError('Tweet content is required', StatusCodes.BAD_REQUEST)
    );
  }

  next();
};
function validategetTweet(req, res, next) {
  const { id } = req.body;

  if (!id) {
    return next(
      new AppError('Tweet id is required', StatusCodes.BAD_REQUEST)
    );
  }

  next();
};

module.exports = {
  validateTweet,
  validategetTweet
}