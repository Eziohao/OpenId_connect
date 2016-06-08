var express = require('express');
var router = express.Router();
var passport = require('passport')
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'FaceBook Login' });
});

router.get('/facebook_login',passport.authenticate('facebook'))
module.exports = router;
