var mongoose = require('mongoose'),
    Schema = mongoose.Schema;


var userSchema = new Schema({
    name: String
});

mongoose.model('user', userSchema);


