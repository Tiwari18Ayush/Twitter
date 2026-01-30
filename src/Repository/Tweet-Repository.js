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
