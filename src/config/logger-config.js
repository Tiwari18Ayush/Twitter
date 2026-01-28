const winston = require('winston');

const logger = winston.createLogger({
  level: 'info',
  // Use ONLY the combine block here
  format: winston.format.combine(
    winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }), // Added a nice date format
    winston.format.json()
  ),
  transports: [
    // Saves only errors to this file
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    // Prints everything (info and above) to the terminal
    new winston.transports.Console({ 
        format: winston.format.simple() 
    })
  ],
});

// logger.info('Logger is initialized!');
module.exports = logger;