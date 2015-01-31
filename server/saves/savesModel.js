var mongoose = require('mongoose');

var UserSavesSchema = new mongoose.Schema({
  user_id: {
    type: String,
    required: true
  },
  game_id: {
    type: String,
    required: true    
  },
  description: {
    type: String
  },
  payload: {
    type: Array,
    required: true
  },
  created_at: {
    type: Date, 
    default: new Date()
  }
});

module.exports = mongoose.model('UserSave', UserSavesSchema);
