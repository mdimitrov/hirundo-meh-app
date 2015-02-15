var mongoose = require('mongoose'),
    Schema = mongoose.Schema;


var tweetSchema = new Schema({
	authorId: String,
	author: String,// референции по unique username към документ от към документ от колекцията User колекцията User
  	content: String,
  	location: String,
  	date: Number
});

// important about Date!!

// var Assignment = mongoose.model('Assignment', { dueDate: Date });
// Assignment.findOne(function (err, doc) {
//   doc.dueDate.setMonth(3);
//   doc.save(callback) // THIS DOES NOT SAVE YOUR CHANGE
  
//   doc.markModified('dueDate');
//   doc.save(callback) // works
// })

tweetSchema.index({ date: 1, type: -1 });
tweetSchema.index({ content: 1, type: "text" });

/* todo: consider virtual getters - damn usefull */
/* todo: consider using middlewear - http://mongoosejs.com/docs/middleware.html */

// userSchema.virtual('following.string').get(function () {
//   var string = following.join();
//   return string;
// });

//methods definitions

mongoose.model('tweet', tweetSchema);


