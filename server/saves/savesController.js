var UserSave = require('./savesModel.js');
var app = require('../server.js');

module.exports = {
  save: function(req, res) { 
    var query = {
      user_id: req.user._id,
      game_id: req.body.game_id
    };

    var document = {
      user_id:       req.user._id,
      game_id:       req.body.game_id,
      description:   req.body.description,
      payload:       req.body.payload
    };

    UserSave.findOneAndUpdate(query, document, function(err, found) {
      if (err) { throw err; }
      
      if (!found) {
        new UserSave(document).save(function(err, result) {
          if (err) { 
            res.sendStatus(500);
            throw err;
          } else {
            console.log('Created New UserSave.');
            res.sendStatus(201);
          }
        });

      } else {
        console.log('Updated UserSave.');    
        res.sendStatus(201);
      }
    });
  },

  load: function(req, res){
    UserSave.find({ user_id: req.user._id, game_id: req.game_id }, function(err, userSave) {
      if (err) { throw err; }
      console.log('Sending UserSave state.');
      res.send(userSave);
    });
  }
};