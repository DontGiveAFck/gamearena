const passport = require('passport');
const LocalStrategy = require('passport-local');
const passportJWT = require("passport-jwt")
const JwtStrategy = passportJWT.Strategy
const config = require('./config');

var strategy = new JwtStrategy(config.jwtOptions, function (jwt_payload, next) {
    User.findOne({ id: jwt_payload.id }, function (err, user) {
        if (err) {
            return next(err)
        }
        if (!user) {
            return next(null, false, { error: "No user found." })
        }
        next(null, user)

    })
});

passport.use(strategy);


/*passport.use(new LocalStrategy(
    function(username, password, done) {
        User.findOne({ username: username }, function(err, user) {
            if (err) { return done(err); }
            if (!user) {
                return done(null, false, { message: 'Incorrect username.' });
            }
            if (!user.validPassword(password)) {
                return done(null, false, { message: 'Incorrect password.' });
            }
            return done(null, user);
        });
    }
));*/