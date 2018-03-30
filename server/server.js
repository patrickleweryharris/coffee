var express = require("express");
var bodyParser = require("body-parser");
var mongodb = require("mongodb");
var mongoose = require('mongoose');
var ObjectID = mongodb.ObjectID;
var User = require('../db/user');

var app = express();
app.use(bodyParser.json());

mongoose.connect(process.env.MONGODB_URI);

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
}

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("Database connection ready");

  // Save database object from the callback for reuse.
  // Initialize the app.
  var server = app.listen(process.env.PORT || 8080, function () {
    var port = server.address().port;
    console.log("App now running on port", port);
  });
});

// ? API ROUTES BELOW

// Generic error handler used by all endpoints.
function handleError(res, reason, message, code) {
  console.log("ERROR: " + reason);
  res.status(code || 500).json({"error": message});
}

/*  "/api/users"
 *    GET: shows all users
 *    POST: creates a new user
 */
app.get("/api/users", function(req, res) {

    db.collection(USERS_COLLECTION).find({}).toArray(function(err, docs) {
    if (err) {
      handleError(res, err.message, "Failed to get list of users.");
    } else {
      res.status(200).json(docs);
    }
  });

});

app.post("/api/register", function(req, res) {

  if (!req.body.name) {
    handleError(res, "Invalid user input", "Must provide a name.", 400);
  }
  if (req.body.email &&
    req.body.name &&
    req.body.password){
      var newUser = {
        email: req.body.email,
        name: req.body.name,
        password: req.body.password
      }

      User.create(newUser, function (error, user) {
        if (error) {
          return next(error);
        }
        else {
          req.session.userId = user._id;
          return res.redirect('/profile'); // need to do something here
        }
      });

    }

  // db.collection(USERS_COLLECTION).insertOne(newUser, function(err, doc) {
  //   if (err) {
  //     handleError(res, err.message, "Failed to create new user.");
  //   } else {
  //     res.status(201).json(doc.ops[0]);
  //   }
  // });

});

app.get("api/login", function(req, res){

});

app.get("api/logout", function(req, res){

});


/* Return saved gifs (assume each gif has gif_id?)
 * possible restful methods?
 *    GET: show saved gifs given user id
 *    PUT: update/save new gif given user id
 */
app.get("/api/users/:id", function(req, res) {

    db.collection(USERS_COLLECTION).find({_id: new ObjectID(req.params.id)}, {gif_id:1, _id:0}).toArray(function(err, docs) {
      if (err) {
        handleError(res, err.message, "Failed to get list of saved gifs.");
      } else {
        res.status(200).json(docs);
      }
    });

});

app.put("/api/users/:id/:gif_id", function(req, res) {
    var updateDoc = req.body;
    delete updateDoc._id;

    db.collection(USERS_COLLECTION).updateOne({_id: new ObjectID(req.params.id)}, updateDoc, function(err, doc) {
      if (err) {
        handleError(res, err.message, "Failed to update user");
      } else {
        updateDoc._id = req.params.id;
        res.status(200).json(updateDoc);
      }
    });
  });

// Delete a gif from collection (if we store each gif in a row?)
app.delete("/api/users/:id/:gif_id", function(req, res) {

    db.collection(USERS_COLLECTION).deleteOne({_id: new ObjectID(req.params.id)}, function(err, result) {
      if (err) {
        handleError(res, err.message, "Failed to delete selected gif");
      } else {
        res.status(200).json(req.params.id);
      }
    });
});

// Remove user
//    DELETE: delete user given id
app.delete("/api/users/:id", function(req, res) {

    db.collection(USERS_COLLECTION).deleteOne({_id: new ObjectID(req.params.id)}, function(err, result) {
      if (err) {
        handleError(res, err.message, "Failed to delete user");
      } else {
        res.status(200).json(req.params.id);
      }
    });

});
