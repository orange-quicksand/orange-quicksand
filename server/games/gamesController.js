var Game = require('./gamesModel.js');

module.exports = {

  // Returns meta-data for ALL the store Games.
  home: function(req, res){
    Game.find(function(err, results) {
      res.send(results);
    });
  }
};