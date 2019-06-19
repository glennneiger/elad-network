var express = require('express');
var router = express.Router();



/* GET home page. */
router.get('/', /* ensureAuthenticated , */ function(req, res, next) {
  req.app.use(express.static(__dirname + '/public'));
  res.render('index.ejs', {
    title: 'Elad Network'
  });
});

/*
function ensureAuthenticated(req, res, next){
  if(req.isAuthenticated()){
    return next();
  }
  res.redirect('/users/login');
}

*/


module.exports = router;
