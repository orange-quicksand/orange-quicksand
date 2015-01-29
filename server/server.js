var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var User = require('./users/userModel.js');
var Game = require('./games/gamesModel.js');
var Rom = require('./games/romsModel.js');
var library = require('./gameLibrary.js');
var romLibrary = require('./romLibrary.js');

var app = express();

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(express.static(__dirname + '/../client'));

var port = process.env.PORT || 3000;
app.listen(port);

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
app.get('/api/games', function(req, res){
  Game.find(function(err, results) {
    res.send(results);
  });
});

// Determine which game to send
app.param('code', function(req, res, next, code){
  req.id = code;
  next();
});

// Routing for game page
app.get('/api/game/:code', function(req, res){
  var id = req.id;
  Rom.find({id: id}, function(err, results) {
    res.send(results);
  });
});

app.post('/user/register', function(req, res){
  console.log(req.body);
});