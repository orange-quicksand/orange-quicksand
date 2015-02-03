var User = require('./userModel.js');
var app = require('../server.js');
var session = require('express-session');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

var sessionSecret = process.env.SECRET || 'orange quicksand';

app.use(session({
  secret: sessionSecret,
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


module.exports = {
    login: function(req, res, next) {
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
    },

    register:  function(req, res){
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
  },

  logout: function(req, res){
    req.logout();
    res.send();
  }
};