const passport = require('passport');
const router = require('express').Router();
const User = require('../handlers/user');
const Game = require('../handlers/game');
const Account = require('../handlers/account');

const gameHandler = new Game();
const userHandler = new User();
const accountHandler = new Account();

router.get('/users', passport.authenticate('jwt.user', { session: false }), (req, res) => {
    userHandler.getUsers(req, res);
})
router.delete('/users', passport.authenticate('jwt.user', { session: false }), (req, res) => {
    userHandler.removeUserByLogin(req, res);
})
router.put('/games', passport.authenticate('jwt.user', { session: false } ), (req, res) => {
    gameHandler.addGame(req, res);
})
router.delete('/games', passport.authenticate('jwt.user', { session: false }), (req, res) => {
    gameHandler.removeGameByTitle(req, res);
})
router.get('/gametypes', passport.authenticate('jwt.admin', { session: false }), (req, res) => {
    gameHandler.getGameTypes(req, res)
})
router.post('/gametypes', passport.authenticate('jwt.admin', { session: false }), (req, res) => {
    gameHandler.addGameType(req, res)
})
router.put('/accounts/setbalance', passport.authenticate('jwt.admin', { session: false }), (req, res) => {
    accountHandler.setBalance(req, res);
})
router.put('/accounts/game', passport.authenticate('jwt.admin', { session: false }), (req, res) => {
    accountHandler.addGameToAccount(req, res)
})
router.delete('/accounts/game', passport.authenticate('jwt.admin', { session: false }), (req, res) => {
    accountHandler.removeGameFromAccount(req, res)
})

module.exports = router