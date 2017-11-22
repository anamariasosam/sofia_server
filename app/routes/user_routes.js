var ObjectID = require("mongodb").ObjectID;

var USERS_COLLECTION = "users";

module.exports = function(app, db) {
  // CONTACTS API ROUTES BELOW

  // Generic error handler used by all endpoints.
  function handleError(res, reason, message, code) {
    console.log("ERROR: " + reason);
    res.status(code || 500).json({ error: message });
  }

  /*  "/api/users"
   *    GET: finds all users
   *    POST: creates a new user
   */

  app.get("/api/users", function(req, res) {
    db
      .collection(USERS_COLLECTION)
      .find({})
      .toArray(function(err, docs) {
        if (err) {
          handleError(res, err.message, "Failed to get users.");
        } else {
          res.status(200).json(docs);
        }
      });
  });

  app.post("/api/users", function(req, res) {
    var newContact = req.body;
    newContact.createDate = new Date();

    if (!req.body.name) {
      handleError(res, "Invalid user input", "Must provide a name.", 400);
    }

    db.collection(USERS_COLLECTION).insertOne(newContact, function(err, doc) {
      if (err) {
        handleError(res, err.message, "Failed to create new user.");
      } else {
        res.status(201).json(doc.ops[0]);
      }
    });
  });

  /*  "/api/users/:id"
   *    GET: find user by id
   *    PUT: update user by id
   *    DELETE: deletes user by id
   */

  app.get("/api/users/:id", function(req, res) {
    db
      .collection(USERS_COLLECTION)
      .findOne({ _id: new ObjectID(req.params.id) }, function(err, doc) {
        if (err) {
          handleError(res, err.message, "Failed to get user");
        } else {
          res.status(200).json(doc);
        }
      });
  });

  app.put("/api/users/:id", function(req, res) {
    var updateDoc = req.body;
    delete updateDoc._id;

    db
      .collection(USERS_COLLECTION)
      .updateOne({ _id: new ObjectID(req.params.id) }, updateDoc, function(
        err,
        doc
      ) {
        if (err) {
          handleError(res, err.message, "Failed to update user");
        } else {
          updateDoc._id = req.params.id;
          res.status(200).json(updateDoc);
        }
      });
  });

  app.delete("/api/users/:id", function(req, res) {
    db
      .collection(USERS_COLLECTION)
      .deleteOne({ _id: new ObjectID(req.params.id) }, function(err, result) {
        if (err) {
          handleError(res, err.message, "Failed to delete user");
        } else {
          res.status(200).json(req.params.id);
        }
      });
  });
};
