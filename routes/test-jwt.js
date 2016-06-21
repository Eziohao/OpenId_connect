var https = require('https');
var postDatajwt = JSON.stringify({
    "realm": "S-SCLLOGIN-SCL1",
    "nonce": "549f22b8-1ea3-4244-b7f0-7cd588ad453e",
    "url": "localhost:3000/profile"
});
var jwtRequest = {
    host: 'apistg.np.covapp.io',
    path: '/authn/v4/sessionToken/nonce/validate',
    port: 443,
    method: "POST",
    headers: {
        "ContentType": "application/vnd.com.covisint.platform.nonce.request.v1+json",
        "x-requestor": "S-SCLLOGIN-SCL1_ADMIN",
        "x-realm": "S-SCLLOGIN-SCL1",
        "Accept": "application/vnd.com.covisint.platform.nonce.response.v1+json",
        "x-requestor-app": "facebook_login",
        "realmId": "S-SCLLOGIN-SCL1",
        "Content-Length": Buffer.byteLength(postDatajwt)
        
    }
}

var post_req_jwt = https.request(jwtRequest, function(res,err) {
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
                    })
                })
                console.log("send nonce");
                console.log(postDatajwt);
                post_req_jwt.write(postDatajwt);
                post_req_jwt.end();
           