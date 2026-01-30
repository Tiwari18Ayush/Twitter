const TweetService=require('../Services/Tweet-Service');
const asyncWrapper=require('../utils/common/wrapper');
const SuccessResponse=require('../utils/common/SuccessResponse');

const createTweet = asyncWrapper(async (req, res) => {
     const result = await TweetService.createTweet(req.body);
     SuccessResponse.data = result;
     return res.status(201).json(SuccessResponse);
});

const getTweet=asyncWrapper(async (req,res)=>{
      const result=await TweetService.getTweet(req.body.id);
      SuccessResponse.data=result;
     return res.status(201).json(SuccessResponse);
})
module.exports={
    createTweet,
    getTweet
}