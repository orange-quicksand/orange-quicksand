// ABOUT
//-------
// The Saves Controller contains all the logic for handling
// game saves that were initiated by the user.
//
// It is called from savesRoutes.js.

var UserSave = require('./savesModel.js');
var app = require('../server.js');

module.exports = {

  // Saving a Game
  //---------------
  //
  // Method Flow:
  // 
  // Looks for a Save File document from the same game in the DB 
  // (A) Updates the the UserSave document if the `query` has `found` the `document`.
  // (B) Creates a new `document` if `query` has NOT `found` a previous instace of it. 
  save: function(req, res) { 
    
    // Building a document with the data provided by the request.
    var document = {
      user_id:       req.user._id,
      game_id:       req.body.game_id,
      description:   req.body.description,
      payload:       req.body.payload
    };
    
    // Query that looks for an existing UserSave document.
    var query = {
      user_id: req.user._id,
      game_id: req.body.game_id
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