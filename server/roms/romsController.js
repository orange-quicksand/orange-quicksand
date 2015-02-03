// ABOUT
//-------
// The Rom Controller contains all the logic for handling
// request for individual ROM files
//
// It is called from romsRoutes.js.

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