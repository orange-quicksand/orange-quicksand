var Roms = require('./romsModel.js');
var app = require('../server.js');

module.exports = {
  uniqueGame: function(req, res){
    var id = req.id;
    Roms.find({id: id}, function(err, results) {
      res.send(results);
    });
  }
};