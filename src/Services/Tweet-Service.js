const tweetRepository=require('../Repository/Tweet-Repository');
const hashtagRepository=require('../Repository/Hashtag-Repository');
const Tweetrepo=new tweetRepository();
const Hashrepo= new hashtagRepository();
const AppError = require('../utils/Errors/AppError');
const { StatusCodes } = require('http-status-codes');
async function createTweet(data) {
  const hashtags = data.content.match(/#[a-zA-Z0-9_]+/g) || [];
  const hashtagTexts = hashtags.map(tag => tag.substring(1).toLowerCase());

  const tweet = await Tweetrepo.create(data);

  if (hashtagTexts.length === 0) return tweet;

  const existingTags = await Hashrepo.getByName(hashtagTexts);
  const existingTagTexts = existingTags.map(tag => tag.text);

  const newTags = hashtagTexts
    .filter(tag => !existingTagTexts.includes(tag))
    .map(tag => ({ text: tag }));

  if (newTags.length > 0) {
    await Hashrepo.bulkCreate(newTags);
  }
  return tweet;
}
async function getTweet(id){
    const tweets = await Tweetrepo.get(id);
        if(!tweets) {
            throw new AppError('No tweets found', StatusCodes.NOT_FOUND);
        }
        return tweets;
}

module.exports={
    createTweet,
    getTweet
}