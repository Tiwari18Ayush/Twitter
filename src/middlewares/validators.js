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

module.exports={
    validateSignUP,
    validateSignIN,
}