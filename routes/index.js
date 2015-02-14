var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var User = mongoose.model('user');

/* GET home page. */
router.get('/', function(req, res) {
	loadUser(req,res, function(user){
		res.render('index', {
			title: 'Welcome to Hirundo',
			user: user,
		});
	});

});

module.exports = router;

function loadUser(req, res, next) {
  if (req.session.userId) {
    User.findById(req.session.userId, function(err, user) {
      if (user) {
        next(user);
        return;
      } else {
        res.redirect('/user/login');
      }
    });
  } else {
    res.redirect('/user/login');
  }
}