var userController = require('./userController.js');
var app = require('../server.js');
var bodyParser = require('body-parser');

app.use(bodyParser.json({limit: '10mb'}));
app.use(bodyParser.urlencoded({limit: '10mb', extended: true}));

module.exports = function(app){
  // Handles registration requests
  app.post('/api/register', userController.register);

  // Handles login requests
  app.post('/api/login', userController.login);

  // Handles log out requests
  app.post('/api/logout', userController.logout);
};
