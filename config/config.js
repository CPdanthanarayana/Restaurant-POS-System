require("dotenv").config();

const config = Object.freeze({
  port: process.env.PORT || 3000,
  databaseURI: process.env.DB_CONNECTION || "mongodb://localhost:2701",
  nodeEnv: process.env.NODE_ENV || "development",
  accessTokenSecret: process.env.jsonwebtoken_SECRET,
});

module.exports = config;
