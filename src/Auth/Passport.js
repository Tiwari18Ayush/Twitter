const passport = require('passport');

require('./Strategies/googleStrategy');
require('./Strategies/jwtStrategy');

module.exports = passport;
