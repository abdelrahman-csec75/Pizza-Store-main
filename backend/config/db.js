/**
 * @file db.js
 * @description Database configuration and connection module using Mongoose.
 */

const mongoose = require('mongoose');
const dns = require('dns');

dns.setServers(['8.8.8.8', '8.8.4.4']);
/**
 * Connect to MongoDB database asynchronously.
 */
const connectDB = async () => {
  try {
    // Attempt connection to MongoDB using the URI from environment variables
    const conn = await mongoose.connect(process.env.MONGODB_URI);

    // Log connection host on successful connection
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    // Log error message if connection fails
    console.error(error);
    // Exit process with failure code
    process.exit(1);
  }
};

module.exports = connectDB;
