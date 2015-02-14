var mongoose = require('mongoose'),
	crypto = require('crypto');
    Schema = mongoose.Schema;


var userSchema = new Schema({
    username: String,
  	email: String,
  	password: String,
  	registrationDate: { type: Date, default: Date.now },
  	following: [String]
});

userSchema.index({ username: 1, type: 1 });

/* todo: consider virtual getters - damn usefull */
/* todo: consider using middlewear - http://mongoosejs.com/docs/middleware.html */
/**
 * Virtuals
 */

userSchema.virtual('id')
  .get(function() {
    return this._id.toHexString();
  });


mongoose.model('user', userSchema);