var savesController = require('./savesController.js');

var ensureAuthenticated = function(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.send(false);
};

module.exports = function(app){
  //Handles game saves requests
  app.post('/api/save', ensureAuthenticated, savesController.save);

  app.param('game_id', function(req, res, next, game_id){
    req.game_id = game_id;
    next();
  });

  app.get('/api/save/:game_id', ensureAuthenticated, savesController.load);
}