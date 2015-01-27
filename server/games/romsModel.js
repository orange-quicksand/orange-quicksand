var mongoose = require('mongoose');

var RomsSchema = new mongoose.Schema({
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
  rom: {
    type: String,
    required: true,
    unique: true
  }
});

module.exports = mongoose.model('Rom', RomsSchema);
