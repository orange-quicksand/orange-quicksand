var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
// var session = require('express-session');
// var passport = require('passport');


// var UserSave = require('./saves/savesModel.js');

var Game = require('./games/gamesModel.js');
var Rom = require('./roms/romsModel.js');
var library = require('./gameLibrary.js');
var romLibrary = require('./romLibrary.js');
// var romLibrary = require('./romLibrary2.js');

var app = express();
module.exports = app;

// Configure express
app.use(bodyParser.json({limit: '10mb'}));
app.use(bodyParser.urlencoded({limit: '10mb', extended: true}));
app.use(express.static(__dirname + '/../client'));

var port = process.env.PORT || 3000;

app.listen(port);

// app.use(passport.initialize());
// app.use(passport.session());

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

require('./users/userRoutes.js')(app);
require('./games/gamesRoutes.js')(app);
require('./saves/savesRoutes.js')(app);
require('./roms/romsRoutes.js')(app);

