var express = require('express');
var mongoose = require('mongoose');
var Game = require('./games/gamesModel.js')

var app = express();

app.use(express.static(__dirname + '/../client'));

app.listen(3000);

var location = process.env.LOC || 'localhost/orangequicksand'
mongoose.connect('mongodb://' + location);

var test = {
  title: 'random title',
  image: 'random fake image',
  rom: 'random digits or whatever'
};

var game = new Game(test);

game.save();

