var romsController = require('./romsController.js');

var ensureAuthenticated = function(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.send(false);
};

module.exports = function(app){
  app.param('code', function(req, res, next, code){
    req.id = code;
    next();
  });
  // Routing for game page
  app.get('/api/game/:code', ensureAuthenticated, romsController.uniqueGame);
};