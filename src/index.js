const express = require('express');
const morgan = require('morgan');
const { serverConfig, loggerConfig } = require('./config'); // Pulls from config/index.js
const connectDB = require('./config/db-config');
const globalErrorHandler=require('./middlewares/globalErrorHandler');
const app = express();

// Middleware
app.use(morgan('dev'));
app.use(express.json()); // Essential for a Twitter clone so you can read JSON tweets!
app.use(globalErrorHandler);
app.listen(serverConfig.PORT, async () => {
   loggerConfig.info(`🚀 Server is live on port ${serverConfig.PORT}`);
    await connectDB();
    
});