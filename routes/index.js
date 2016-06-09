var express = require('express');
var router = express.Router();
var passport = require('passport');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'FaceBook Login' });
});

router.get('/facebook_login',passport.authenticate('facebook'));

router.get('/auth/facebook/callback', 
  passport.authenticate('facebook', { failureRedirect: '/' }),
  function(req, res) {
  	console.log('good');
    res.redirect('/profile');
  });
router.get('/profile',
	function(req,res){
		res.render('profile',{user:req.user});
	})
module.exports = router;
