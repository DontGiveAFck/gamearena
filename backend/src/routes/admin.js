const passport = require('passport');
const router = require('express').Router();
const User = require('../handlers/user');
const Game = require('../handlers/game');
const Account = require('../handlers/account');

const gameHandler = new Game();
const userHandler = new User();
const accountHandler = new Account();

/**
 * Get all user.
 * @name Get all user
 * @route {GET} /admin/user
 * @authentication This route requires auth with admin rights. If authentication fails it will return a 401 error.
 */
router.get('/user', passport.authenticate('jwt.admin', { session: false }), (req, res) => {
    userHandler.getUsers(req, res);
})

/**
 * Delete user by login.
 * @name Delete user by login
 * @route {DELETE} /admin/user
 * @authentication This route requires auth with admin rights. If authentication fails it will return a 401 error.
 * @bodyparam {String} login user login
 */
router.delete('/user', passport.authenticate('jwt.admin', { session: false }), (req, res) => {
    userHandler.removeUserByLogin(req, res);
})

/**
 * Add game.
 * @name Add game
 * @route {PUT} /admin/game
 * @authentication This route requires auth with admin rights. If authentication fails it will return a 401 error.
 * @bodyparam {String} title game title
 * @bodyparam {String} description game description
 * @bodyparam {String} type game type
 */
router.put('/game', passport.authenticate('jwt.admin', { session: false } ), (req, res) => {
    gameHandler.addGame(req, res);
})

/**
 * Delete game by title.
 * @name Delete game by title
 * @route {DELETE} /admin/game
 * @authentication This route requires auth with admin rights. If authentication fails it will return a 401 error.
 * @bodyparam {String} title game title
 */
router.delete('/game', passport.authenticate('jwt.admin', { session: false }), (req, res) => {
    gameHandler.removeGameByTitle(req, res);
})

/**
 * Get game types.
 * @name Get game types
 * @route {GET} /admin/gametype
 * @authentication This route requires auth with admin rights. If authentication fails it will return a 401 error.
 */
router.get('/gametype', passport.authenticate('jwt.admin', { session: false }), (req, res) => {
    gameHandler.getGameTypes(req, res)
})
/**
 * Add game type.
 * @name Add game type
 * @route {POST} /admin/gametype
 * @authentication This route requires auth with admin rights. If authentication fails it will return a 401 error.
 * @bodyparam {String} type gametype
 */
router.post('/gametype', passport.authenticate('jwt.admin', { session: false }), (req, res) => {
    gameHandler.addGameType(req, res)
})
/**
 * Set account balance.
 * @name Add Set account balance
 * @route {PUT} /admin/account/setbalance
 * @authentication This route requires auth with admin rights. If authentication fails it will return a 401 error.
 * @bodyparam {String} newbalance new account balance
 * @bodyparam {String} userid userid
 */
router.put('/account/setbalance', passport.authenticate('jwt.admin', { session: false }), (req, res) => {
    accountHandler.setBalance(req, res);
})
/**
 * Add game to account.
 * @name Add game to account
 * @route {PUT} /admin/account/game
 * @authentication This route requires auth with admin rights. If authentication fails it will return a 401 error.
 * @bodyparam {String} accountid
 * @bodyparam {String} gameid
 */
router.put('/account/game', passport.authenticate('jwt.admin', { session: false }), (req, res) => {
    accountHandler.addGameToAccount(req, res)
})
/**
 * Remove game from account.
 * @name Remove game from account
 * @route {DELETE} /admin/account/game
 * @authentication This route requires auth with admin rights. If authentication fails it will return a 401 error.
 * @bodyparam {String} accountid
 * @bodyparam {String} gameid
 */
router.delete('/account/game', passport.authenticate('jwt.admin', { session: false }), (req, res) => {
    accountHandler.removeGameFromAccount(req, res)
})
/**
 * Set account score.
 * @name Set account score in game
 * @route {PUT} /admin/account/leaderboard
 * @authentication This route requires auth with admin rights. If authentication fails it will return a 401 error.
 * @bodyparam {String} score new score
 * @bodyparam {String} gameid
 * @bodyparam {String} accountId
 */
router.put('/account/leaderboard', passport.authenticate('jwt.admin', { session: false }), (req, res) => {
    accountHandler.setLeaderboard(req, res)
})
/**
 * Give admin rights to user.
 * @name Give admin rights to user
 * @route {PUT} /admin/makeadmin
 * @authentication This route requires auth with admin rights. If authentication fails it will return a 401 error.
 * @bodyparam {String} userid
 */
router.put('/makeadmin', passport.authenticate('jwt.admin', { session: false }), (req, res) => {
    userHandler.makeAdmin(req, res)
})

module.exports = router