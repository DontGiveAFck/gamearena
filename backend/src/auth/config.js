const passportJWT = require("passport-jwt")
const ExtractJwt = passportJWT.ExtractJwt
const jwt = 'secretsecret'

const jwtOptions = {}

var fromCookie = function (request) {
    var token = null;
    if (request.cookies) {
         token = request.cookies.token
    }
    return token;
};

jwtOptions.jwtFromRequest = ExtractJwt.fromExtractors([fromCookie])
jwtOptions.secretOrKey = jwt

exports.jwt = jwt
exports.jwtOptions = jwtOptions