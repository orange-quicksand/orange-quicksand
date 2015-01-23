var express = require('express');
var mongoose = require('mongoose');
var routes = require('./routes.js');

var app = express();

app.use(express.static(__dirname + '/../../client'));

mongoose.connect('mongodb://localhost/orangequicksand');
