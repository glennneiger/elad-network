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
// var multer = require('multer');
// var upload = multer({dest: './uploads'});
var flash = require('connect-flash');
var bcrypt = require('bcryptjs');
var mongo = require('mongodb');
const mongoose = require('mongoose');
const fileUpload = require('express-fileupload')

// var funcoes = require('./public/javascripts/teste')

// var routes = require('./routes/index');
// var dashboard = require('./routes/dashboard');

// Property MongoDB model
const Property = require('./models/property')

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

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));

app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.urlencoded({extended: true}));

app.use(fileUpload())

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

// app.get('*', function(req, res, next) {
//   res.locals.user = req.user || null;
//   next();
// })

// routing changes ---- ---- ---- ---- ---- ---- ---- ---- 

// app.use('/', routes);
// app.use('/dashboard', dashboard);

app.get('/', function(req, res, next) {
  res.render('index', {title:'Dashboard'});
})

app.get('/dashboard', function(req, res, next) {
  res.render('dashboard', {title:'Dashboard'});
})

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

app.get('/properties/:id', function(req, res) {
  var id = req.params.id

  Property.findById(id, function(error, foundProperty) {
    if(error) {
      console.log("Couldn't find property with that id:")
    } else {
      console.log('Property found:')
      console.log(foundProperty)

      res.render('property', {
        propertyName: foundProperty.propertyName,
        tokenSymbol: foundProperty.tokenSymbol,
        totalSupply: foundProperty.totalSupply,
        ethPrice: foundProperty.ethPrice,
        eladPrice: foundProperty.eladPrice,
        fallbackAddress: foundProperty.fallbackAddress,
        propertyDescription: foundProperty.propertyDescription,
        propertyImage: foundProperty.propertyImage
      })
    }
  })
})

app.get('/create', function(req, res, next) {
  res.render('create', {title:'Create Property'});
})

app.get('/manage', function(req, res, next) {
  res.render('manage', {title:'Manage Properties'});
})

app.get('/blank', function(req, res, next) {
  res.render('blank', {title:'Blank page'});
})

app.post('/create-property', (req, res) => {
  var data = req.body

  var imageFile = req.files.propertyImage
  // console.log('imageFile:')
  // console.log(imageFile)

  imageFile.mv('public/uploads/' + imageFile.name, function(error) {
    if(error) {
      console.log('Couldn\'t upload the image file' )
      console.log(error)
    } else {
      console.log('Image file successfully uploaded')
    }
  })

  Property.create({
      propertyName: data.propertyName,
      tokenSymbol: data.tokenSymbol,
      totalSupply: data.totalSupply,
      ethPrice: data.ethPrice,
      eladPrice: data.eladPrice,
      fallbackAddress: data.fallbackAddress,
      propertyDescription: data.propertyDescription,
      propertyImage: imageFile.name
  }, function(error, data) {
      if(error) {
          console.log('There was a problem adding a document to the collection')
          console.log(error)
      } else {
          console.log('Data successfully added to the collection')
          // console.log(data)
      }
  })

  res.redirect('properties')
})

app.get('*', (req, res) => {
  res.send('Error! Page not found')
})

// routing changes ---- ---- ---- ---- ---- ---- ---- ---- 

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