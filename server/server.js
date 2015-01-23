var express = require('express');
var mongoose = require('mongoose');

var app = express();

app.use(express.static(__dirname + '/../client'));

app.listen(3000);

// app.get('/', function(req, res) {
//   res.send('/../../client');
// });

// mongoose.connect('mongodb://localhost/orangequicksand');
