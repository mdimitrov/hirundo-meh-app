var express = require('express');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var mongoose = require('mongoose');
var path = require('path');
var fs = require('fs');
var logger = require('morgan');
var bodyParser = require('body-parser');
var config = require('./config');//cool
var exphbs  = require('express-handlebars');

var app = express();

/********* Mongoose config ***********/
var connect = function () {
    mongoose.connect(config.db.uri);
};
connect();
mongoose.connection.on('error', console.log);
mongoose.connection.on('disconnected', connect);

/******* configure environment *****/
app.use(logger('dev')); //why not
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(cookieParser());
app.use(session({ secret: 'keyboard cat'}))

app.use(express.static(path.normalize(__dirname + '/public'))); // load static assets from here

// /********* Set views path and engine ***********/
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'hjs');
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

/********* App logic ***********/
//bootstrap models
// require('./models');//must happen before routing starts!
fs.readdirSync(__dirname + '/models').forEach(function (file) {
  if (~file.indexOf('.js')) require(__dirname + '/models/' + file);
});

//load routes
var index = require("./routes"),
    user = require("./routes/user"),
	feed = require("./routes/feed"),
    tweet = require("./routes/tweet");

app.use('/', index);
app.use('/user', user);
app.use('/feed', feed);
app.use('/tweet', tweet);

/********* Error handling ***********/
// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});
// error handlers
// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

module.exports = app;