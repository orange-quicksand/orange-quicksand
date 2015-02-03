var express = require('express');
var bodyParser = require('body-parser');
var db = require('./db.js');


// EXPRESS CONFIGURATION
// ---------------------
var app = express();
module.exports = app;

app.use(bodyParser.json({limit: '10mb'}));
app.use(bodyParser.urlencoded({limit: '10mb', extended: true}));
app.use(express.static(__dirname + '/../client'));


var port = process.env.PORT || 3000;
app.listen(port);


// ROUTES SETUP
//--------------
require('./users/userRoutes.js')(app);
require('./games/gamesRoutes.js')(app);
require('./saves/savesRoutes.js')(app);
require('./roms/romsRoutes.js')(app);


// FILE STRUCTURE
//=====================
//
// /server/db.js
// /server/`modelName`/`modelNameController`/
// /server/`modelName`/`modelNameRoutes`/
// /server/`modelName`/`modelNameModel`/ 
//