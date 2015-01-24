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
