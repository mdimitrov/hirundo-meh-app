var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

var User = mongoose.model('user');

router.route('/')

    // create a User (accessed at POST http://localhost:1337/hirondu/users)
    .post(function(req, res) {
        
        var User = new User();      // create a new instance of the User model
        User.name = req.body.name;  // set the users name (comes from the request)

        // save the User and check for errors
        User.save(function(err) {
            if (err)
                res.send(err);

            res.render('uisers',{ message: 'User created!' });
        });
        // res.render('users',{ message: 'User created!' });
        
    })

    // get all the users (accessed at GET http://localhost:1337/hirondu/users)
    .get(function(req, res) {
        User.find(function(err, users) {
            if (err)
                res.send(err);

            res.render('users', {message: 'get all users'});
        });
    });

// on routes that end in /users/:userId
// ----------------------------------------------------
router.route('/:userId')

    // get the User with that id (accessed at GET http://localhost:1337/hirondu/users/:userId)
    .get(function(req, res) {
        res.render('users', {message: 'get user with id ' + req.params.userId});
    })

    // update the User with this id (accessed at PUT http://localhost:1337/hirondu/users/:userId)
    .put(function(req, res) {
        res.render('users', {message: 'update user with id ' + req.params.userId});
    })

    // delete the User with this id (accessed at DELETE http://localhost:1337/hirondu/users/:userId)
    .delete(function(req, res) {
        // User.remove({
        //     _id: req.params.userId
        // }, function(err, User) {
        //     if (err)
        //         res.send(err);

        //     res.json({ message: 'Successfully deleted' });
        // });
        res.render('users', {message: 'delete user with id ' + req.params.userId});
    });

module.exports = router;
