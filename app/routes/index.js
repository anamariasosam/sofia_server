const userRoutes = require("./user_routes");
const authRoutes = require("./auth_routes");

module.exports = function(app, db) {
  userRoutes(app, db);
  authRoutes(app);
};
