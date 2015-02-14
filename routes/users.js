var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

var User = mongoose.model('user');

router.route('/')

    // create a UserEntry (accessed at POST http://localhost:1337/users)
    .post(function(req, res) {
        
        var UserEntry = new User();      // create a new instance of the User model
        UserEntry.username = req.body.username;  // set the users username (comes from the request)

        // save the UserEntry and check for errors
        UserEntry.save(function(err) {
            if (err) {
                res.send(err);
            }

            res.render('uisers',{ message: 'UserEntry created!' });
        });
        // res.render('users',{ message: 'UserEntry created!' });
        
    })

    // get all the users (accessed at GET http://localhost:1337/users)
    .get(function(req, res) {

        // var Testomir = new User({
        //     username: "testomir",
        //     email: "testov@test.test",
        //     password: "qwerty",
        //     registrationDate: new Date(),
        //     following: [],
        // });

        // Testomir.save(function(err) {
        //     if (err) {
        //         res.send(err);
        //     }

            User.find(function(err, users) {
                if (err) {
                    res.send(err);
                }
                res.json(users); 
                // res.render('users', {message: 'get all users'});
            });

        // });
    });

// on routes that end in /users/:userId
// ----------------------------------------------------
router.route('/:userId')

    // get the User with that id (accessed at GET http://localhost:1337/users/:userId)
    .get(function(req, res) {
        res.render('users', {message: 'get user with id ' + req.params.userId});
    })

    // update the User with this id (accessed at PUT http://localhost:1337/users/:userId)
    .put(function(req, res) {
        res.render('users', {message: 'update user with id ' + req.params.userId});
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
        res.render('users', {message: 'delete user with id ' + req.params.userId});
    });

module.exports = router;
