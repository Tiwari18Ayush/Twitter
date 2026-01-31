const asyncWrapper=require('../utils/common/wrapper');
const SuccessResponse=require('../utils/common/SuccessResponse');
const authService=require('../Services/user-Service');

const createUser=asyncWrapper(async (req,res)=>{
    const data=req.body;
    const result=await authService.createUser(data);
    SuccessResponse.data=result;
    return res.status(201).json(SuccessResponse);
});
const userLogin=asyncWrapper(async (req,res)=>{
const data=req.body;
const result=await authService.userLogin(data);
 SuccessResponse.data=result;
 return res.status(201).json(SuccessResponse);
});

module.exports={
   createUser,
   userLogin
}