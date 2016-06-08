var passport = require('passport');
, FacebookStrategy = require('passport-facebook').Strategy;
 passport.use(new FacebookStrategy({
      	clientID:'1186130451420038',
      	clientSecret:'45adcb738d93ec590fd3e78c41261b92',
      	callbackURL:'http://localhost:3000/auth/facebook/callback'
      },
      function(accesstoken,refreshToken,profile,done){
      	if(err){
      		return done(err);
      	}
      }))