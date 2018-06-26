const router = require('express').Router();
const User = require('../handlers/user');
const userHandler = new User();

router.put('/signup', (req, res) => {
    userHandler.addUser(req, res);
});

router.post('/signin', (req, res) => {
    userHandler.signIn(req, res);
});

module.exports = router