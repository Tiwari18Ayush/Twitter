<<<<<<< HEAD
const Tweet = require('../models/Tweet');

class TweetRepository {

    async create(data) {
        return await Tweet.create(data);
    }

    async get(id) {
        return await Tweet.findById(id);
    }

    async destroy(id) {
        return await Tweet.findByIdAndDelete(id);
    }
}

module.exports = TweetRepository;
=======
const model=require('../models/Tweet');
class TweetRepository{
      constructor(model){
        this.model=model;
      }
      async create(data){
        const result=await model.create(data);
        return result;
      }
      async get(id) {
        const result = await this.model.findById(id);
        return result;
    }

    async destroy(id) {
        const result = await this.model.findByIdAndDelete(id);
        return result;
    } 
}
module.exports=TweetRepository;
>>>>>>> d9ea1745063af94398ce1ff5d0fe8a8dabb2badd
