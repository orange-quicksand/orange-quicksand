var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var session = require('express-session');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

var User = require('./users/userModel.js');
var Game = require('./games/gamesModel.js');
var Rom = require('./games/romsModel.js');
var library = require('./gameLibrary.js');
var romLibrary = require('./romLibrary.js');

var app = express();

// Configure express
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static(__dirname + '/../client'));

var port = process.env.PORT || 3000;
app.listen(port);

// Configure passport authorization
app.use(session({secret: 'orange quicksand'}));
app.use(passport.initialize());
app.use(passport.session());


passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  done(null, id);
  // User.findOne({ id: id }, function(err, user) {
  //   if (err) {
  //     done(err);
  //   } else {
  //     done(null, user);
  //   }
  // });
});

passport.use(new LocalStrategy(function(username, password, done) {
  User.findOne({ username: username }, function(err, user) {
    if (err) {
      return done(err);
    }
    if (!user) {
      return done(null, false, { message: 'Unknown user ' + username });
    }
    if (user.password === password) {
      return done(null, user);
    } else {
      return done(null, false, { message: 'Invalid password' });
    }
  });
}));

var ensureAuthenticated = function(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.send(false);
};



// Create mongo database
var location = process.env.LOC || 'localhost/orangequicksand';
mongoose.connect('mongodb://' + location);

// Initialize database with test game info
for (var i = 0; i < library.length; i++) {
  new Game(library[i]).save();
}

for (var i = 0; i < romLibrary.length; i++) {
  new Rom(romLibrary[i]).save();
}


// Routing for homepage
app.get('/api/games', ensureAuthenticated, function(req, res){
  Game.find(function(err, results) {
    res.send(results);
  });
});

// Determines which game to send
app.param('code', function(req, res, next, code){
  req.id = code;
  next();
});

// Routing for game page
app.get('/api/game/:code', ensureAuthenticated, function(req, res){
  var id = req.id;
  Rom.find({id: id}, function(err, results) {
    res.send(results);
  });
});

// Handles registration requests
app.post('/api/register', function(req, res){
  var username = req.body.username;
  var password = req.body.password;

  User.findOne({username: username}, function(err, found) {
    if (found) {
      res.send(false);
    } else {
      new User({
        username: username,
        password: password
      }).save();
      res.send(true);
    }
  });
});

// Handles login requests
app.post('/api/login', function(req, res, next) {
  passport.authenticate('local', function(err, user, info) {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.send(false);
    }
    req.logIn(user, function(err) {
      if (err) {
        return next(err);
      }
      return res.send(true);
    });
  })(req, res, next);
});

// Handles log out requests
app.get('/api/logout', function(req, res){
  req.logout();
  res.send(true);
});
