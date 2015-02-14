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
            registrationDate: new Date(),
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
        User.find(function(err, users) {
            if (err) {
                res.send(err);
            }
            res.json(users);
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
        app.get('/logout', function (req, res) {
          delete req.session.userId;
          res.redirect('/');
        });
    });

router.route('/register')
    .get(function(req, res) {
        res.render('register', {});
    });

// on routes that end in /users/:userId
// ----------------------------------------------------
router.route('/:userId')

    // get the User with that id (accessed at GET http://localhost:1337/users/:userId)
    .get(function(req, res) {
        res.render('user',{
            title: 'Users Panel',
            message: 'get user with id ' + req.params.userId
        });
    })

    // update the User with this id (accessed at PUT http://localhost:1337/users/:userId)
    .put(function(req, res) {
        res.render('user',{
            title: 'Users Panel',
            message: 'update user with id ' + req.params.userId
        });
    })

    // delete the User with this id (accessed at DELETE http://localhost:1337/users/:userId)
    .delete(function(req, res) {
        // User.remove({
        //     _id: req.params.userId
        // }, function(err, User) {
        //     if (err)
        //         res.send(err);

        //     res.json({ message: 'Successfully deleted' });
        // });
        res.render('user',{
            title: 'Users Panel',
            message: 'delete user with id ' + req.params.userId
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