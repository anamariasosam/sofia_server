require("dotenv").config();

module.exports = {
  url:
    "mongodb://" +
    process.env.DB_USER +
    ":" +
    process.env.DB_PASS +
    "@ds115396.mlab.com:15396/sofia"
};
