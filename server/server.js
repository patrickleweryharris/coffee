var express = require("express");
var bodyParser = require("body-parser");
var mongodb = require("mongodb");
var mongoose = require('mongoose');
var session = require('express-session');
var bcrypt = require('bcrypt');
var MongoStore = require('connect-mongo')(session);
var ObjectID = mongodb.ObjectID;
var User = require('../db/user');

var app = express();
app.use(bodyParser.json());

mongoose.connect(process.env.MONGODB_URI || 'mongodb://heroku_7ktv9vft:811ufk5iq4as8u5peplshtm31d@ds119489.mlab.com:19489/heroku_7ktv9vft');
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

// Session storage

app.use(session({
  secret: 'gifs are cool',
  resave: true,
  saveUninitialized: false,
  store: new MongoStore({
    mongooseConnection: db
  })
}));

// API Endpoints

// Generic error handler used by all endpoints.
function handleError(res, reason, message, code) {
  console.log("ERROR: " + reason);
  res.status(code || 500).json({"error": message});
}

/*  "/api/users"
 *    GET: shows all users
 *    DELETE: deletes a user given by an id
 *    PUT: Update a given user's password, name, or email
 */
app.get("/api/users", function(req, res, next) {
  User.find({}, {'name': 1, 'email': 1} , function(err, users){
    if(err){
      handleError(res, err.message, "Failed to get list of users.", 500);
    }
    else{
      res.status(200).send(users);
    }
  });
});

// Update various parts of a user id
app.put("/api/users/:id/:variable", function(req, res, next){
  if(req.body.updater){
    if (req.params.variable === 'password'){
      // Passwords that go into the db need to be hashed
      bcrypt.hash(req.body.updater, 10, function (err, hash){
        if (err) {
          handleError(res, err.message, "Failed to hash new pw", 500);
        }
        else{
          User.findByIdAndUpdate(req.params.id, {'password': hash} , function(error, user){
            if(error){
              handleError(res, error.message, "Failed to update password", 500);
            }
            else{
              res.status(200).send("Password updated")
            }
          });
        }
      });
    }

    else if (req.params.variable === 'email' || req.params.variable === 'name'){
      var requestedChange = req.params.variable;
      var project = {};
      project[requestedChange] = req.body.updater;
      User.findByIdAndUpdate(req.params.id, project, function(error, user){
        if(error){
          handleError(res, error.message, "Failed to update", 500);
        }
        else{
          res.status(200).send("updated")
        }
      });
    }
    else {
      handleError(res, "Update variable not recognized", "Use one of: password, email, name", 400);
    }
  }
  else{
    handleError(res, "Provide item to update", "Use one of: password, email, name", 400);
  }
});

app.delete("/api/users/:id", function(req, res) {
    User.findByIdAndRemove(req.params.id, function(error, users){
      if (error){
        handleError(res, err.message, "Failed to delete user", 500);
      }
      else {
        res.status(200).send("User successfully deleted");
      }
    })
});

/*  "/api/register"
 *    POST: creates a new user
 *    Based on this tutorial:
 *    https://medium.com/of-all-things-tech-progress/starting-with-authentication-a-tutorial-with-node-js-and-mongodb-25d524ca0359
 */
app.post("/api/register", function(req, res, next) {
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
          handleError(res, error, "Failed to create databased entry", 500)
        }
        else {
          res.status(200).send("User registered");
          req.session.userId = user._id;
        }
      });
    }
});

/*  "/api/login"
 *    POST: Login an existing user
 */
app.get("api/login", function(req, res, next){
  // TODO
});

/*  "/api/logout"
 *    POST: Logout currently logged in user
 */
app.get("api/logout", function(req, res, next){
  req.session.destroy(function(err) {
      if(err) {
        handleError(res, err.message, "Failed to log out", 500);
      } else {
        res.status(200).send("Logged Out");
      }
    });
});


/* "/api/gifs/:id"
 *    GET: show saved gifs given user id
 *    PUT: save a given gif to a user's account
 *    DELETE: Remove a given gif from the collection of a given user
 */
app.get("/api/gifs/:id", function(req, res) {
  User.find({'_id' : { $eq: req.params.id}}, {'gifs': 1} , function(err, users){
    if(err){
      handleError(res, err.message, "Failed to get list of gifs", 500);
    }
    else{
      res.status(200).send(users);
    }
  });
});

app.put("/api/gifs/:id", function(req, res) {
  if (req.body.gif){
    // Push new gif to gifs array
    User.findByIdAndUpdate(req.params.id, {"$push": {gifs: req.body.gif}}, function(err, users){
      if(err){
        handleError(res, err.message, "Failed to update gif list", 500);
      }
      else{
        res.status(200).send("Gif added");
      }
    });
  }
  else{
    handleError(res, "Failed to update gif list", "Gif is required", 400);
  }
  });

app.delete("/api/gifs/:id", function(req, res) {
  if (req.body.gif){
    // Pull gif from gifs array
    User.findByIdAndUpdate(req.params.id, {"$pull": {gifs: req.body.gif}}, function(err, users){
      if(err){
        handleError(res, err.message, "Failed to update gif list", 500);
      }
      else{
        res.status(200).send("Gif removed");
      }
    });
  }
  else{
    handleError(res, "Failed to update gif list", "Gif is required", 400);
  }
});
