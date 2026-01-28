const mongoose = require("mongoose");
const { serverConfig, loggerConfig } = require("./index");

const connectDB = async () => {
  try {
    await mongoose.connect(serverConfig.DB_URL);
    // loggerConfig.info("MongoDB connected");
  } catch (err) {
    loggerConfig.error("MongoDB connection failed", err);
    process.exit(1);
  }
};

module.exports = connectDB;
