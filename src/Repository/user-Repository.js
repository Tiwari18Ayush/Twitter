const User = require('../models/User');

class UserRepository {
    async create(data) {
        return await User.create(data);
    }

  async findByEmail(email) {
    return await User.findOne({ email }).select('+password');
}


    async getById(id) {
        return await User.findById(id).populate('tweets');
    }
}

module.exports = UserRepository;