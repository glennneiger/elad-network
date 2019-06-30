var express = require('express');
// var router = express.Router();
var multer = require('multer');
// var upload = multer({dest: './uploads'});
var bcrypt = require('bcryptjs');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

const Property = require('../models/property')

const app = express()

// Set The Storage Engine
const storage = multer.diskStorage({
    destination: '../public/uploads/',
    filename: function(req, file, cb){
      cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
})
  
// Init Upload
const upload = multer({
    storage: storage,
    limits: { fileSize: 1000000 },
    fileFilter: function(req, file, cb){
        checkFileType(file, cb);
    }
}).single('propertyImage')
  
// Check File Type
function checkFileType(file, cb){
    // Allowed ext
    const filetypes = /jpeg|jpg|png|gif/;
    // Check ext
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    // Check mime
    const mimetype = filetypes.test(file.mimetype);
  
    if(mimetype && extname){
        return cb(null,true);
    } else {
        cb('Error: Images Only!');
    }
}

app.set('view engine', 'ejs')

app.get('/', function(req, res, next) {
    res.render('dashboard', {title:'Dashboard'});
});

app.get('/register', function(req, res, next) {
    res.render('register', {title:'Register'});
});

app.get('/login', function(req, res, next) {
    res.render('login', {title:'Login'});
});

app.get('/dashboard', function(req, res, next) {
    res.render('dashboard', {title:'Dashboard'});
});

app.get('/create', function(req, res, next) {
    res.render('create', {title:'Create Property'});
});

app.get('/manage', function(req, res, next) {
    res.render('manage', {title:'Manage Properties'});
});

app.get('/properties', function(req, res) {
    Property.find({}, function(error, properties) {
        if(error) {
            console.log('There was a problem retrieving the properties from the database')
            console.log(error)
        } else {
            res.render('properties', {
                propertiesList: properties
            })
        }
    })
})

app.get('/blank', function(req, res, next) {
    res.render('blank', {title:'Blank page'});
})

app.post('/login', 
    passport.authenticate('local', { failureRedirect: '/dashboard/login', failureFlash: 'Invalid username or password'}),
    function(req, res) {
        req.flash('success', 'You are now logged in');
    res.redirect('/');
    }
);

app.post('/create-property', (req, res) => {
    var data = req.body
    
    Property.create({
        propertyName: data.propertyName,
        tokenSymbol: data.tokenSymbol,
        totalSupply: data.totalSupply,
        ethPrice: data.ethPrice,
        eladPrice: data.eladPrice,
        fallbackAddress: data.fallbackAddress,
        propertyDescription: data.propertyDescription,
        propertyImage: data.propertyImage
    }, function(error, data) {
        if(error) {
            console.log('There was a problem adding a document to the collection')
            console.log(error)
        } else {
            console.log('Data successfully added to the collection')
            console.log(data)
        }
    })

    // upload(req, res, (err) => {
    //     console.log('objeto req:')
    //     console.log(req.body)
    //     if(err){
    //         res.render('/', {
    //             msg: err
    //         })
    //     } else {
    //         if(req.body.propertyImage == ''){
    //             res.render('file-uploaded', {
    //                 msg: 'Error: No File Selected!'
    //             })
    //         } else {
    //             res.render('file-uploaded', {
    //                 msg: 'File Uploaded!',
    //                 file: `public/uploads/${req.body.propertyImage}`
    //             })
    //         }
    //     }
    // });

    res.render('manage', {title:'Manage Properties'});
});

passport.serializeUser(function(user, done) {
    done(null, user.id);
});
  
passport.deserializeUser(function(id, done) {
    User.getUserById(id, function(err, user) {
      done(err, user);
    })
})

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

// router.post('/register', upload.single('profileImage'), function(req, res, next) {
//   console.log("body parsing", req.body);
//   var name = req.body.name;
//   var email = req.body.email;
//   var username = req.body.username;
//   var password = req.body.password;
//   var password2 = req.body.password2;

//   if(req.file) {
//     console.log('Uploading file...');
//     var profileImage = req.file.filename;
//   }
//   else {
//     console.log('No file uploaded');
//     var profileImage = 'noimage.jpg';
//   }

//     // Form Validator
//     req.checkBody('name', 'Name field is required').notEmpty();
//     req.checkBody('email', 'Email field is required').notEmpty();
//     req.checkBody('email', 'Email is not valid').isEmail();
//     req.checkBody('username', 'Username field is required').notEmpty();
//     req.checkBody('password', 'Password field is required').notEmpty();
//     req.checkBody('password2', 'Passwords do not match').equals(password);
  
//   // Check Errors
//   var errors = req.validationErrors();

//   if (errors) {
//       res.render('register', {
//         errors: errors
//       });
//   } else {
//       var newUser = new User({
//         name: name,
//         email: email,
//         username: username,
//         password: password,
//         profileImage: profileImage
//     });

//     User.createUser(newUser, function(err, user) {
//       if(err) throw err;
//       console.log(user);
//     });

//     req.flash('success', 'You are now registered');

//     res.location('/');
//     res.redirect('/');
//   }
// });

app.get('/logout', function(req, res) {
  req.logout();
  req.flash('success', 'You are now logged out');
  res.redirect('/dashboard/login');
});

module.exports = app;