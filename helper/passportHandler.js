let passportJwt = require("passport-jwt");  
let JwtStrategy = passportJwt.Strategy;
let ExtractJwt = passportJwt.ExtractJwt;
const SECRET = 'bGEyYWF2dnQ1Zm5ncWp0ZmZxcQ==';

var opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = SECRET;

const applyPassportStrategy = (passport) => {    
    passport.use(new JwtStrategy(opts, function(jwt_payload, done) {
        //console.log(jwt_payload);       
        return done(null,true);
    }));
}


module.exports = {applyPassportStrategy}