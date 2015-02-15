var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

var User = mongoose.model('user');

router.route('/')

    // create a UserEntry (accessed at POST http://localhost:1337/user)
    .post(function(req, res) {
        if (!req.body) {
            return res.sendStatus(400);
        }
        var post = req.body;
        var newUser = new User({
            username: post.username,
            email: post.email,
            registrationDate: + new Date(),
            following: [],
        });
        newUser.password = post.password;

        newUser.save(function(err) {
            if (err) {
                res.send(err);
            }
            res.redirect('/');
        });

    })

    // get all the users (accessed at GET http://localhost:1337/user)
    .get(function(req, res) {
        loadUser(req,res, function(user){
            User.find()
                .where('username')
                .nin(user.following.concat([user.username]))
                .exec(function(err, users) {
                    if (err) {
                        res.send(err);
                    }
                    res.render('index', {
                        user: user,
                        users: users,
                        listing: true,
                    });
                });
        });
    });

router.route('/follow/:username')
    .get(function(req, res) {
        var username = req.params.username;
        loadUser(req,res, function(user){
            if(username != user.username) {
                if(user.following.indexOf(username) < 0) {
                    user.following.push(username);
                }
            }
            user.save(function(err) {
                if (err) {
                    res.send(err);
                }
                res.redirect('/user');
            });
        });

    });

router.route('/unfollow/:username')
    .get(function(req, res) {
        loadUser(req,res, function(user){
            var username = req.params.username;
            user.following.splice(user.following.indexOf(username), 1);
            user.save(function(err) {
                if (err) {
                    res.send(err);
                }
                res.redirect('/user');
            });
        });
    });

router.route('/login')
    .get(function(req, res) {
        res.render('login', {});
    })
    .post(function(req, res) {
        if (!req.body) {
            return res.sendStatus(400);
        }
        var post = req.body;
        console.log(post)
        User.findOne({username: post.username}, function(err, user) {
            if (err) {
                res.send(err);
            }
            if(user && user.password == post.password) {
                req.session.userId = user.id;
                res.redirect('/');
            } else {
                res.render('login', {message: 'Ivalid Login Data'});
            }
        });
    });

router.route('/logout')
    .get(function(req,res) {
        delete req.session.userId;
        res.redirect('/');
    });

router.route('/register')
    .get(function(req, res) {
        res.render('register', {});
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