// ABOUT
//-------
//
// Contains the definition for the user model and helper functions
// that are used for handling data from the user's model
//

var mongoose = require('mongoose');
var bcrypt = require('bcrypt');

var UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
  }
});

// SAVING NEW USERS
//------------------
//
// When a instance of `User` attemps to save to the DB throught the 
// .save method, this mongoose middleware will run and salt+hash
// the `User` instance's password before storing into the DB.

UserSchema.pre('save', function(next) {
  var user = this;

  if(!user.isModified('password')) {
    return next();
  }

  bcrypt.genSalt(10, function(err, salt) {
    if(err) {
      return next(err);
    }

    bcrypt.hash(user.password, salt, function(err, hash) {
      if(err) return next(err);
      user.password = hash;
      next();
    });
  });
});

// PASSWORD VERIFICATION
//-----------------------
//
// `UserSchema.methods` works similar to the "Object.prototype" pseudoclasical 
// instantiation pattern. This `.comparePassword` method will we included in
// all instances of the `User` model. `bcrypt.compare` will return `isMatch`
// as true if the matching was correct.
UserSchema.methods.comparePassword = function(candidatePassword, cb) {
  bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
    if(err) {
      return cb(err);
    }
    cb(null, isMatch);
  });
};

module.exports = mongoose.model('User', UserSchema);
