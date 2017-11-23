require("dotenv").config();

module.exports = {
  facebookClientID: process.env.facebookClientID,
  facebookClientSecret: process.env.facebookClientSecret,
  mongoURI: process.env.mongoURI
};
