var mongoose = require('mongoose');

var RomsSchema = new mongoose.Schema({
  hashBrowns: {
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
