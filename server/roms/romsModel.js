// ABOUT
//------
//
// The Rom model stores all Game Files.
//
// VERY IMPORTANT:
//
// ROMs are stored as Base64 enconded and Javascript Escaped Strings.
// 

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