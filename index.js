const express = require("express");
const MongoClient = require("mongodb").MongoClient;
const bodyParser = require("body-parser");
const db_config = require("./config/db");

const app = express();

const PORT = process.env.PORT || 5000;

app.use(bodyParser.json());

// Create a database variable outside of the database connection callback to reuse the connection pool in your app.
var db;

// Connect to the database before starting the application server.
MongoClient.connect(db_config.url, function(err, database) {
  if (err) {
    console.log(err);
    process.exit(1);
  }

  // Save database object from the callback for reuse.
  db = database;
  console.log("Database connection ready");

  require("./app/routes")(app, database);

  // Initialize the app.
  var server = app.listen(PORT, function() {
    console.log("App now running on port", PORT);
  });
});
