const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const mongoose = require('mongoose');
const Admin = mongoose.model('admin');
var keys;

if(require('../config/keys_prod').mongoURI !== undefined){
   keys = require('../config/keys_prod');
} else {
   keys = require('../config/keys_dev');
}

const opts={};
opts.jwtFromRequest =  ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = keys.secretOrKey;

module.exports = passport => {
  passport.use(
    new JwtStrategy(opts, (jwt_payload, done)=>{
      Admin.findById(jwt_payload.id)
        .then(user => {
          if(user){
            return done(null, user);
          }
          return done(null, false);
        })
        .catch(err => console.log(err));
    })
  );
};
