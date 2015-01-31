var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var session = require('express-session');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

var UserSave = require('./saves/savesModel.js');

var User = require('./users/userModel.js');
var Game = require('./games/gamesModel.js');
var Rom = require('./games/romsModel.js');
var library = require('./gameLibrary.js');
var romLibrary = require('./romLibrary.js');
// var romLibrary = require('./romLibrary2.js');

var app = express();

// Configure express
app.use(bodyParser.json({limit: '10mb'}));
app.use(bodyParser.urlencoded({limit: '10mb', extended: true}));
app.use(express.static(__dirname + '/../client'));

var port = process.env.PORT || 3000;
app.listen(port);

// Configure passport authorization
app.use(session({
  secret: 'orange quicksand',
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());


passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function (err, user) {
    done(err, user);
  });
});

passport.use(new LocalStrategy(function(username, password, done) {
  User.findOne({ username: username }, function(err, user) {
    if (err) {
      return done(err);
    }
    if (!user) {
      return done(null, false, { message: 'Unknown user ' + username });
    }
    user.comparePassword(password, function(err, isMatch) {
      if (err) {
        return done(err);
      }
      if (isMatch) {
        return done(null, user);
      } else {
        return done(null, false, { message: 'Invalid password' });
      }
    });
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
mongoose.connection.collections['games'].drop(function(err, result) {
  for (var i = 0; i < library.length; i++) {
    new Game(library[i]).save(function (err, game, numberAffected) {
      if (err) {
        console.log('Saving error: ' + err);
      }
    });
  }
});

mongoose.connection.collections['roms'].drop(function(err, result) {
  for (var i = 0; i < romLibrary.length; i++) {
    new Rom(romLibrary[i]).save(function (err, rom, numberAffected) {
      if (err) {
        console.log('Saving error: ' + err);
      }
    });
  }
});


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

//Handles game saves requests
app.post('/api/save', ensureAuthenticated, function(req, res) {
  
  var query = {
    user_id: req.user._id,
    game_id: req.body.game_id
  };

  var document = {
    user_id:       req.user._id,
    game_id:       req.body.game_id,
    description:   req.body.description,
    payload:       req.body.payload
  };

  UserSave.findOneAndUpdate(query, document, function(err, found) {
    if (err) { throw err; }
    
    if (!found) {
      new UserSave(document).save(function(err, result) {
        if (err) { 
          res.sendStatus(500);
          throw err;
        } else {
          console.log('Created New UserSave.');
          res.sendStatus(201);
        }
      });

    } else {
      console.log('Updated UserSave.');    
      res.sendStatus(201);
    }
  });
});


// Determines which Game user wants to load
app.param('game_id', function(req, res, next, game_id){
  req.game_id = game_id;
  next();
});

app.get('/api/save/:game_id', ensureAuthenticated, function(req, res) {
  UserSave.find({ user_id: req.user._id, game_id: req.game_id }, function(err, userSave) {
    if (err) { throw err; }
    console.log('Sending UserSave state.');
    res.send(userSave);
  });
});

// Handles log out requests
app.get('/api/logout', function(req, res){
  req.logout();
  res.send();
});
