const Like = require('../models/likes');

class LikeRepository {
    
    // Find a specific like to check if we should "toggle" it off
    async findByUserAndLikeable(data) {
        const like = await Like.findOne({
            user: data.user,
            likeable: data.likeable,
            onModel: data.onModel
        });
        return like;
    }

    // Create a new like entry
    async create(data) {
        const result = await Like.create(data);
        return result;
    }
    // count likes
    async count(filter) {
      return Like.countDocuments(filter);
    }


    // Remove a like entry
    async delete(id) {
        const result = await Like.findByIdAndDelete(id);
        return result;
    }
}

module.exports = LikeRepository;