var express = require('express');
var router = express.Router();
var multer = require('multer');
var upload = multer({dest: './uploads'});
var bcrypt = require('bcryptjs');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

var User = require('../models/user');

/* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });

router.get('/', function(req, res, next) {
  res.render('dashboard.jade', {title:'Dashboard'});
});

router.get('/register', function(req, res, next) {
  res.render('register', {title:'Register'});
});

router.get('/login', function(req, res, next) {
  res.render('login', {title:'Login'});
});

router.get('/dashboard', function(req, res, next) {
  res.render('dashboard.jade', {title:'Dashboard'});
});

router.get('/create', function(req, res, next) {
  res.render('create.jade', {title:'Create Property'});
});

router.get('/manage', function(req, res, next) {
  res.render('manage.jade', {title:'Manage Properties'});
});

router.post('/login', 
  passport.authenticate('local', { failureRedirect: '/dashboard/login', failureFlash: 'Invalid username or password'}),
  function(req, res) {
    req.flash('success', 'You are now logged in');
  res.redirect('/');
  }
);

router.post('/create-property', function(req, res, next) {
  var dataGotFromForm = req.body
  
  console.log(dataGotFromForm)

  res.render('manage.jade', {title:'Manage Properties'});
});

// router.post('/create-property', (req, res) => {
//   var dataGotFromForm = req.body
  
//   console.log(dataGotFromForm)

//   res.render('/dashboard.jade')
// })

passport.serializeUser(function(user, done) {
    done(null, user.id);
  });
  
passport.deserializeUser(function(id, done) {
    User.getUserById(id, function(err, user) {
      done(err, user);
    });
  });

passport.use(new LocalStrategy(function(username, password, done) {
    User.getUserByUsername(username, function(err, user){
      console.log("username is: " + username);
      if(err) throw err;
      if(!user){
        return done(null, false, {message: 'Unknown User'});
      }

      User.comparePassword(password, user.password, function(err, isMatch){
        console.log(password + "=" + user.password);
        if(err) return done(err);
        if(isMatch){
          return done(null, user);
        } else {
          return done(null, false, {message: 'Invalid Password'});
        }
      });
    });
}));

router.post('/register', upload.single('profileImage'), function(req, res, next) {
  console.log("body parsing", req.body);
  var name = req.body.name;
  var email = req.body.email;
  var username = req.body.username;
  var password = req.body.password;
  var password2 = req.body.password2;

  if(req.file) {
    console.log('Uploading file...');
    var profileImage = req.file.filename;
  }
  else {
    console.log('No file uploaded');
    var profileImage = 'noimage.jpg';
  }

  // Form Validator
  req.checkBody('name', 'Name field is required').notEmpty();
  req.checkBody('email', 'Email field is required').notEmpty();
  req.checkBody('email', 'Email is not valid').isEmail();
  req.checkBody('username', 'Username field is required').notEmpty();
  req.checkBody('password', 'Password field is required').notEmpty();
  req.checkBody('password2', 'Passwords do not match').equals(password);
  
  // Check Errors
  var errors = req.validationErrors();

  if (errors) {
    res.render('register', {
      errors: errors
    });
  } else {
    var newUser = new User({
      name: name,
      email: email,
      username: username,
      password: password,
      profileImage: profileImage
    });

    User.createUser(newUser, function(err, user) {
      if(err) throw err;
      console.log(user);
    });

    req.flash('sucess', 'You are now registered');

    res.location('/');
    res.redirect('/');
  }
});



router.get('/logout', function(req, res) {
  req.logout();
  req.flash('success', 'You are now logged out');
  res.redirect('/dashboard/login');
});

module.exports = router;
