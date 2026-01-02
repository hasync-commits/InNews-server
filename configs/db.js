require('dotenv').config(); 
const mongoURL = process.env.MONGO_URL || 'mongodb://localhost:27017/InNewsDB';

const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(mongoURL);
    console.log("MongoDB connected");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1);
  }
};

module.exports = connectDB;
