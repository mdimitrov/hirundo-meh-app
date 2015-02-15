var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var User = mongoose.model('user');
var Tweet = mongoose.model('tweet');

router.get('/', function(req, res) {
  var userId = req.session.userId,
      tweets = [];

      if (!req.session.userId) return;

      User.findOne({_id: userId}, function (err, user) {
        if (err) {
          callback(err);
        } else {
          Tweet.find({$or: [{author: { $in: user.following } }, {authorId: userId}]}, function (err, data) {
            if (err) {
              callback(err);
            } else {
              res.json({
              empty: !data.length,
              tweets: data
            });
            }
          })
        }
      });
});

module.exports = router;
