var mongoose = require('mongoose');

var Game = require('./games/gamesModel.js');
var Rom = require('./roms/romsModel.js');

var library = require('./gameLibrary.js');
var romLibrary = require('./romLibrary.js');


// SETTING UP DB CONNECTION
//==========================
var location = process.env.LOC || 'localhost/orangequicksand';
mongoose.connect('mongodb://' + location);

// DB INIT
//========
//
// Inserting the game froms the romLibrary.js before starting.
//
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