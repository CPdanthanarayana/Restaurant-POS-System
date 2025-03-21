const { request } = require("express");
const mongoose = require("mongoose");
const config = require("./config");

const connectDB = async () => {
  try {
    const connect = await mongoose.connect(config.databaseURI);
    console.log(`✅ MongoDB Connected: ${connect.connection.host} `);
  } catch (error) {
    console.log(`❌ Database connection failed: ${error.message}`);
    process.exit();
  }
};

module.exports = connectDB;
