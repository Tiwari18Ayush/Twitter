const AppError = require('../utils/Errors/AppError');
const { StatusCodes } = require('http-status-codes');
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
function authenticate(req,res,next){
   const header = req.headers.authorization;

   if(!header){
      return next(new AppError("Token missing",StatusCodes.UNAUTHORIZED));
   }

   const token = header.split(' ')[1];

   const decoded = jwt.verify(token, process.env.JWT_SECRET);

   req.user = decoded;

   next();
}
module.exports={
    validateSignUP,
    validateSignIN,
    authenticate
}