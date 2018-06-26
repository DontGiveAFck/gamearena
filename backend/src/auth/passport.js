const passport = require('passport');
const passportJWT = require("passport-jwt")
const JwtStrategy = passportJWT.Strategy
const config = require('./config');
const User = require('../handlers/user')
const userHandler = new User()

const strategyForUser = new JwtStrategy(config.jwtOptions, function (jwt_payload, next) {
    userHandler.getUserById(jwt_payload.id, function (err, user) {
        if (err) {
            return next(err)
        }
        if (!user) {
            return next(null, false, { error: "No user found." })
        }
        console.log(user);
        next(null, user)
    })
});

const strategyForAdmin = new JwtStrategy(config.jwtOptions, function (jwt_payload, next) {
    userHandler.getUserById(jwt_payload.id, function (err, user) {
        if (err) {
            return next(err)
        }
        if (!user) {
            return next(null, false, { error: "No user found." })
        }
        if (!user.admin) {
            return next(null, false, { error: "Not allowed" })
        }
        next(null, user)
    })
});

passport.use('jwt.user',strategyForUser);
passport.use('jwt.admin', strategyForAdmin);