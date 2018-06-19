const passport = require('passport');
const router = require('express').Router();
const User = require('../handlers/user');
const Game = require('../handlers/game');

const gameHandler = new Game();
const userHandler = new User();

router.get('/users', (req, res) => {
    req.query.login == undefined ?
        userHandler.getUsers(req, res) :
        userHandler.getUserByLogin(req, res);
});

router.put('/users', passport.authenticate('jwt', { session: false,
    successRedirect: 'http://localhost:3000/users' }), (req, res) => {
    userHandler.addUser(req, res);
});

router.post('/users', passport.authenticate('jwt', { session: false,
    successRedirect: 'http://localhost:3000/users' }), (req, res) => {
    userHandler.signIn(req, res);
});

router.delete('/users', passport.authenticate('jwt', { session: false,
    successRedirect: 'http://localhost:3000/users' }), (req, res) => {
    userHandler.removeUserByLogin(req, res);
});

router.get('/games', passport.authenticate('jwt', { session: false,
    failureRedirect: 'http://localhost:3000/users' }), (req, res) => {
    req.query.title == undefined ?
        gameHandler.getGames(req, res) :
        gameHandler.getGameByTitle(req, res);
});
router.put('/games', passport.authenticate('jwt', { session: false,
    failureRedirect: 'http://localhost:3000/users' }), (req, res) => {
    gameHandler.addGame(req, res);
});
router.delete('/games', passport.authenticate('jwt', { session: false,
    failureRedirect: 'http://localhost:3000/users' }), (req, res) => {
    gameHandler.removeGameByTitle(req, res);
});

module.exports = router;