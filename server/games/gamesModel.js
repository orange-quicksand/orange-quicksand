var mongoose = require('mongoose');

var GamesSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true
  },
  image: {
    type: String,
    required: true,
  },
  rom: {
    type: String,
    required: true,
    unique: true
  }
});




module.exports = mongoose.model('Game', GamesSchema);
