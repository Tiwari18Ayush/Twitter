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