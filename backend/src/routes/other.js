const router = require('express').Router();
const User = require('../handlers/user');
const userHandler = new User();

/**
 * Sign up.
 * @name Sign up
 * @route {POST} /signup
 * @bodyparam {String} login
 * @bodyparam {String} password
 * @bodyparam {String} email
 * @bodyparam {String} username
 */
router.post('/signup', (req, res) => {
    userHandler.addUser(req, res);
});
/**
 * Sign in.
 * @name Sign in
 * @route {POST} /signin
 * @bodyparam {String} login
 * @bodyparam {String} password
 */
router.post('/signin', (req, res) => {
    userHandler.signIn(req, res);
});

module.exports = router