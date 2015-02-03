var Game = require('./gamesModel.js');

module.exports = {
  home: function(req, res){
    Game.find(function(err, results) {
    res.send(results);
    });
  }
};