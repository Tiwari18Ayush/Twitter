const Hashtag = require('../models/Hashtag');

class HashTagRepository {

    async create(data) {
        return await Hashtag.create(data);
    }

    async bulkCreate(data) {
        return await Hashtag.insertMany(data);
    }

    async get(id) {
        return await Hashtag.findById(id);
    }

    async getByName(names) {
        return await Hashtag.find({
            text: { $in: names }
        });
    }

    async destroy(filter) {
        return await Hashtag.deleteOne(filter);
    }
}

module.exports = HashTagRepository;
