const userRepository=require('../Repository/user-Repository');
const userRepo=new userRepository();
const AppError = require('../utils/Errors/AppError');
const { StatusCodes } = require('http-status-codes');
const bcrypt = require('bcrypt');
const JWT=require('../utils/common/JWT');
async function createUser(data){
    const result=userRepo.create(data);
    return result;
}
async function userLogin(data){
const user = await userRepo.findByEmail(data.email);
if(!user){
    throw new AppError("User Not found with this EmailID",StatusCodes.NOT_FOUND);
}
const enteredPassword=data.password;
const isMatch = await bcrypt.compare(enteredPassword, user.password);

if(!isMatch){
    throw new AppError("Entered incorrect Password",StatusCodes.UNAUTHORIZED);
}

const token = JWT.generateToken({ id: user.id });

return token;
}
module.exports={
    createUser,
    userLogin
}