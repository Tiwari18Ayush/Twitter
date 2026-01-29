const AppError=require('../utils/Errors/AppError');
const ErrorResponse=require('../utils/common/ErrorResponse');
const { StatusCodes } = require('http-status-codes');

module.exports = (err, req, res, next) => {
  let error = err;

  // Default values (for safety)
  error.statusCode = error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR;
  error.explanation = error.explanation || 'Something went wrong';

  // -----------------------------
  // Mongo / Mongoose Errors
  // -----------------------------

  // Invalid ObjectId (CastError)
  if (err.name === 'CastError') {
    error = new AppError('Invalid resource ID', StatusCodes.BAD_REQUEST);
  }

  // Duplicate key error
  if (err.code === 11000) {
    error = new AppError('Duplicate field value entered', StatusCodes.BAD_REQUEST);
  }

  // Validation error
  if (err.name === 'ValidationError') {
    const message = Object.values(err.errors)
      .map(val => val.message)
      .join(', ');
    error = new AppError(message, StatusCodes.BAD_REQUEST);
  }

  // -----------------------------
  // Prepare Error Response
  // -----------------------------
  ErrorResponse.message = error.explanation;
  ErrorResponse.error = error;

  // -----------------------------
  // Operational vs Programming Error
  // -----------------------------
  if (error.isOperational) {
    return res.status(error.statusCode).json(ErrorResponse);
  }

  // Unknown / Programming error
  console.error('💥 ERROR:', err);

  ErrorResponse.message = 'Internal Server Error';
  ErrorResponse.error = {};

  return res
    .status(StatusCodes.INTERNAL_SERVER_ERROR)
    .json(ErrorResponse);
};