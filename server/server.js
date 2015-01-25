var express = require('express');
var mongoose = require('mongoose');
var Game = require('./games/gamesModel.js');
var Rom = require('./games/romsModel.js');
var library = require('./library.js');

var app = express();

app.use(express.static(__dirname + '/../client'));

var port = process.env.PORT || 3000;
app.listen(port);

// create database
var location = process.env.LOC || 'localhost/orangequicksand';
mongoose.connect('mongodb://' + location);

// initialize database
for (var i = 0; i < library.length; i++) {
  new Game(library[i]).save();
}

// routing for homepage
app.get('/games', function(req, res){
  Game.find(function(err, results) {
    console.log(results);
    res.send(results);
  });
});

// routing for game page
app.get('/:code', function(req, res){

});
