var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var User = mongoose.model('user');
var Tweet = mongoose.model('tweet');

router.post('/', function(req, res) {
  var userId = req.session.userId,
  	tweet;

  	if (!req.session.userId) return;

  	User.findOne({_id: userId}, function (err, user) {
  		if (err) {
  			console.error(err);
  		} else {
  			new Tweet({
		    	authorId: userId,
		    	author: user.username,
		    	content: req.body.content,
		    	location: "Sofia",
		    	date: + new Date()
		    }).save(function (err) {
		    	if (err) {
		    		console.error(err);
		    	} else {
		    		res.end();
		    	}
		    })
  		}
  	})
});

module.exports = router;
