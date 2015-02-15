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
          Tweet.find({$or: [{author: { $in: user.following } }, {authorId: userId}]}, null, {
            sort: {date: -1},
            limit: 50,
          }, function (err, data) {
            if (err) {
              callback(err);
            } else {
              res.json({
              empty: !data.length,
              tweets: data.map(function (tweet) {
                return {
                  author: tweet.author,
                  content: tweet.content,
                  date: tweet.date,
                  disableUnfollow: tweet.authorId === userId
                };
              })
            });
            }
          })
        }
      });
});

module.exports = router;
