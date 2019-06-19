var createError = require('http-errors');
const express = require('express');
const path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const bodyParser = require('body-parser');
var favicon = require('serve-favicon');
var session = require('express-session');
var passport = require('passport');
var expressValidator = require('express-validator');
var LocalStrategy = require('passport-local').Strategy;
var multer = require('multer');
var upload = multer({dest: './uploads'});
var flash = require('connect-flash');
var bcrypt = require('bcryptjs');
var mongo = require('mongodb');
const mongoose = require('mongoose');
// var db = mongoose.connection;


var routes = require('./routes/index');
var dashboard = require('./routes/dashboard');

var app = express();

mongoose.connect('mongodb://admin:admin123@ds237267.mlab.com:37267/elad-network', {
  useNewUrlParser: true
}, function(error) {
  if(error) {
    console.log('There was an error connecting to the database')
    console.log(error)
  } else {
    console.log('We are connected to the database!')
  }
})

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.set('view engine', 'ejs');



app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Handle Sessions
app.use(session({
  secret: 'secret',
  saveUninitialized: true,
  resave: true
}));

// Passport 
app.use(passport.initialize());
app.use(passport.session());

// Validator
app.use(expressValidator({
  errorFormatter: function(param, msg, value) {
      var namespace = param.split('.')
      , root    = namespace.shift()
      , formParam = root;

    while(namespace.length) {
      formParam += '[' + namespace.shift() + ']';
    }
    return {
      param : formParam,
      msg   : msg,
      value : value
    };
  }
}));

app.use(require('connect-flash')());
app.use(function (req, res, next) {
  res.locals.messages = require('express-messages')(req, res);
  next();
});

app.get('*', function(req, res, next) {
  res.locals.user = req.user || null;
  next();
})

app.use('/', routes);
app.use('/dashboard', dashboard);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;

