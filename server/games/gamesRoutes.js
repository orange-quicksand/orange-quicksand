var gamesController = require('./gamesController.js');

var ensureAuthenticated = function(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.send(false);
};


module.exports = function(app){
	// Routing for homepage
	app.get('/api/games', ensureAuthenticated, gamesController.home);
};