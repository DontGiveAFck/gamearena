const passport = require('passport');
const router = require('express').Router();
const User = require('../handlers/user');
const Game = require('../handlers/game');
const Account = require('../handlers/account');

const gameHandler = new Game();
const userHandler = new User();
const accountHandler = new Account();

router.get('/games', passport.authenticate('jwt.user', { session: false }), (req, res) => {
    req.query.title == undefined ?
        gameHandler.getGames(req, res) :
        gameHandler.getGameByTitle(req, res);
});
router.get('/scores', passport.authenticate('jwt.user', { session: false }), (req, res) => {
    accountHandler.getScore(req, res)
})
router.get('/scores/all', passport.authenticate('jwt.user', { session: false }), (req, res) => {
    accountHandler.getScore(req, res)
})
router.get('/scores', passport.authenticate('jwt.user', { session: false}), (req, res) => {
    req.query.gameid == undefined ?
        accountHandler.getScoresByGameId(req, res) :
        accountHandler.getScoresByAccountId(req, res)
})

module.exports = router;