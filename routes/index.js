var express = require('express');
var router = express.Router();
var passport = require('passport');
var https = require('https');

var postDataNonce = JSON.stringify({ //set request nonce data
    'url': "http://localhost:3000",
    "cuid": "S-SCLLOGIN-SCL1_ADMIN",
    "realm": "S-SCLLOGIN-SCL1"
})


var nonceRequest = { //set request headers
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
var postDatajwt = {
    "realm": "S-SCLLOGIN-SCL1",
    "nonce": "",
    "url": "localhost:3000/profile"
}
var jwtRequest = {
    host: 'apistg.np.covapp.io',
    path: '/authn/v4/sessionToken/nonce/validate',
    port: 443,
    method: "POST",
    headers: {
        "Content-Type": "application/vnd.com.covisint.platform.nonce.request.v1+json",
        "x-requestor": 'S-SCLLOGIN-SCL1_ADMIN',
        "x-realm": 'S-SCLLOGIN-SCL1',
        "Accept": 'application/vnd.com.covisint.platform.nonce.response.v1+json',
        "x-requestor-app": 'facebook_login',
        "realmId": 'S-SCLLOGIN-SCL1',
        "Content-Length":""
        
    }
}
var getUsers={
	host:'apistg.np.covapp.io',
	path:'/person/v3/persons/IJJF7CC1',
	port:443,
	method:"GET",
	headers:{
		"Content-Type":"application/vnd.com.covisint.platform.person.v1+json",
		"Accept":"application/vnd.com.covisint.platform.person.v1+json",
		"solutionInstanceId":"2b442c1f-34d2-4256-9d5f-2a049294450f",
		"XSRFToken":""
	}
}


/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'FaceBook Login' });
});

router.get('/facebook_login', passport.authenticate('facebook')); //login to facebook

router.get('/auth/facebook/callback',
    passport.authenticate('facebook', { failureRedirect: '/' }),
    function(req, res) {
        console.log('good');
        res.redirect('/profile');
    });
router.get('/profile', //jumping to profile page
    function(req, res) {
        var post_req_nonce = https.request(nonceRequest, function(res) { //post for getting nonce
            console.log('send request');
            var buffer = "";
            res.setEncoding("utf-8");
            res.on("data", function(data) {
                buffer += data;

            });
            res.on("end", function() {
         
                buffer = JSON.parse(buffer);
                postDatajwt.nonce = buffer.nonce;
                jwtRequest["headers"]["Content-Length"]=Buffer.byteLength(JSON.stringify(postDatajwt))
                
                var post_req_jwt = https.request(jwtRequest, function(res,err) {     //post nonce for getting XSRFtoken
                     var jwtToken = "";
                    if(err){
                    	return err;
                    }
                    console.log(jwtRequest.headers);
                    res.setEncoding("utf-8");
                    res.on("data", function(data) {
                        jwtToken += data;	
                    });
                    res.on("end", function() {
                        console.log(jwtToken);
                        jwtToken=JSON.parse(jwtToken);
                        getUsers["headers"]["XSRFToken"]=jwtToken.xsrfToken;
                        console.log(getUsers);
                        var get_usersRequest=https.request(getUsers,function(res){   //get users info
                        	var users='';
                        	res.setEncoding("utf-8");
                        	res.on('data',function(data){
                        		users+=data;
                        	})
                        	res.on("end",function(){
                        		console.log(users);
                        	})
                        })
                    
                     get_usersRequest.end()
                    })
                })
                console.log("send nonce");
                console.log(postDatajwt);
                post_req_jwt.write(JSON.stringify(postDatajwt));
                post_req_jwt.end();
            });
        })

        post_req_nonce.write(postDataNonce);
        post_req_nonce.end();

        res.render('profile', { user: req.user }); //rendering user profile on the page

    })

module.exports = router;