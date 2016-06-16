var express = require('express');
var router = express.Router();
var passport = require('passport');
var https = require('https');

var postDataNonce = JSON.stringify({
    'url': "http://www.apple.com",
    "cuid": "S-SCLLOGIN-SCL1_ADMIN",
    "realm": "S-SCLLOGIN-SCL1"
})
var nonce;
var nonceRequest = {
    host: "authn-4-stg.run.covisintrnd.com",
    path: "/authn/nonce",
    port: 443,
    method: "POST",
    headers: {
        "Content-Type": "application/vnd.com.covisint.platform.authn.nonce.v1+json",
        "x-requestor-app": "facebook_login",
        "x-requestor": "facebook_login",
        "Accept": "application/vnd.com.covisint.platform.authn.nonce.v1+json",
        "x-realm": "S-SCLLOGIN-SCL1",
        "Content-Length": Buffer.byteLength(postDataNonce)
    }

};
/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'FaceBook Login' });
});

router.get('/facebook_login', passport.authenticate('facebook'));

router.get('/auth/facebook/callback',
    passport.authenticate('facebook', { failureRedirect: '/' }),
    function(req, res) {
        console.log('good');
        res.redirect('/profile');
    });
router.get('/profile',
    function(req, res) {




        var post_req_nonce = https.request(nonceRequest, function(res) {
            console.log('send request');
            var buffer = "";
            res.setEncoding("utf-8");
            res.on("data", function(data) {
                buffer += data;
            });
            res.on("end", function() {
                console.log(buffer);
            });
        })
        
        post_req_nonce.write(postDataNonce);
        post_req_nonce.end();
        res.render('profile', { user: req.user });

    })

module.exports = router;