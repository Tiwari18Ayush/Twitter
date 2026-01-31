const jwt = require('jsonwebtoken');
require('dotenv').config(); // Loads variables from .env into process.env

const generateToken = (payload) => {
  // Use the environment variable, or a fallback (only for dev!)
  const secretKey = process.env.JWT_SECRET; 

  const options = {
    expiresIn: '1h', 
  };

  return jwt.sign(payload, secretKey, options);
};

module.exports = { generateToken };