var express = require("express");
var bodyParser = require("body-parser");
var mongodb = require("mongodb");
var mongoose = require('mongoose');
var session = require('express-session');
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
 */
app.get("/api/users", function(req, res, next) {
  User.find({}, {'name': 1, 'email': 1} , function(err, users){
    if(err){
      handleError(res, err.message, "Failed to get list of users.");
    }
    else{
      res.status(200).send(users);
    }
  });
});

app.delete("/api/users/:id", function(req, res) {
    // TODO
});

/*  ""/api/register"
 *    POST: creates a new user
 */
app.post("/api/register", function(req, res, next) {
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
        handleError(res, err.message, "Failed to log out");
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
      handleError(res, err.message, "Failed to get list of gifs");
    }
    else{
      res.status(200).send(users);
    }
  });
});

app.put("/api/gifs/:id/:gif_id", function(req, res) {
   // TODO
  });

// Delete a gif from collection (if we store each gif in a row?)
app.delete("/api/gifs/:id/:gif_id", function(req, res) {
    // TODO
});
