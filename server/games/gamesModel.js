// ABOUT
//------
//
// The Game model stores all meta data related to the game. The 
// game files themselves are stored in the Rom model.
// 

var mongoose = require('mongoose');

var GamesSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true
  },
  title: {
    type: String,
    required: true,
    unique: true
  },
  image: {
    type: String,
    required: true,
  },
  description: {
    type: String
  }
});

module.exports = mongoose.model('Game', GamesSchema);
