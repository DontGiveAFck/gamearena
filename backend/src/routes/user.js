const passport = require('passport');
const router = require('express').Router();
const User = require('../handlers/user');
const Game = require('../handlers/game');
const Account = require('../handlers/account');

const gameHandler = new Game();
const userHandler = new User();
const accountHandler = new Account();

/**
 * Get all games.
 * @name Get all games
 * @route {GET} /user/games
 * @authentication This route requires auth with user rights. If authentication fails it will return a 401 error.
 * @queryparam {String} title if parameter exist return only one game
 */
router.get('/games', passport.authenticate('jwt.user', { session: false }), (req, res) => {
    req.query.title == undefined ?
        gameHandler.getGames(req, res) :
        gameHandler.getGameByTitle(req, res);
});
/**
 * Get games on current account.
 * @name Get games on current account
 * @route {GET} /user/account/games
 * @authentication This route requires auth with user rights. If authentication fails it will return a 401 error.
 */
router.get('/account/games', passport.authenticate('jwt.user', { session: false }), (req, res) => {
    accountHandler.getAccountGames(req, res)
})
/**
 * Get full leaderboard list.
 * @name Get games on current account
 * @route {GET} /user/leaderboard/all
 * @authentication This route requires auth with user rights. If authentication fails it will return a 401 error.
 */
router.get('/leaderboard/all', passport.authenticate('jwt.user', { session: false }), (req, res) => {
    accountHandler.getScore(req, res)
})
/**
 * Get leaderboard of one game.
 * @name Get leaderboard of one game
 * @route {GET} /user/account/games
 * @authentication This route requires auth with user rights. If authentication fails it will return a 401 error.
 * @queryparam {String} gameid
 */
router.get('/leaderboard/game', passport.authenticate('jwt.user', { session: false}), (req, res) => {
        accountHandler.getScoresByGameId(req, res)
})
/**
 * Get account scores in all games.
 * @name Get account scores in all games
 * @route {GET} /user/leaderboard/account
 * @authentication This route requires auth with user rights. If authentication fails it will return a 401 error.
 * @queryparam {String} accountid
 */
router.get('/leaderboard/account', passport.authenticate('jwt.user', { session: false}), (req, res) => {
    accountHandler.getScoresByAccountId(req, res)
})
/**
 * Upload avatar.
 * @name Upload user avatar
 * @route {POST} /user/avatar/add
 * @authentication This route requires auth with user rights. If authentication fails it will return a 401 error.
 * @queryparam {File} avatar
 */
router.post('/avatar/add', passport.authenticate('jwt.user', { session: false}), (req, res) => {
    userHandler.addAvatar(req, res)
})

module.exports = router;