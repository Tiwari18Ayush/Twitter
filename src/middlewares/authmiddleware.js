const AppError = require('../utils/Errors/AppError');
const { StatusCodes } = require('http-status-codes');
const jwt=require('../utils/common/JWT');
function validateSignUP(req,res,next){
    const {email,password,username}=req.body;
    if(!email || !password || !username){
      return  next(new AppError("Missing Field",StatusCodes.BAD_REQUEST));
    }
    next();
}
function validateSignIN(req,res,next){
    const {email,password}=req.body;
    if(!email || !password ){
        return next(new AppError("Missing Field",StatusCodes.BAD_REQUEST));
    }
    next();
}
function authenticate(req, res, next) {
    const header = req.headers.authorization;

    if (!header) {
        // This will be caught by your global error handler
        return next(new AppError("Token missing", StatusCodes.UNAUTHORIZED));
    }

    // Split 'Bearer <token>'
    const token = header.split(' ')[1];

    if (!token) {
        return next(new AppError("Malformed Token", StatusCodes.UNAUTHORIZED));
    }

    // If jwt.verify fails, it throws an error. 
    // If this function is wrapped in your asyncWrapper, it goes straight to global handler.
    const decoded = jwt.verifyToken(token);

    // If we reach here, the token is valid.
    req.user = decoded; 

    next();
}
module.exports={
    validateSignUP,
    validateSignIN,
    authenticate
}