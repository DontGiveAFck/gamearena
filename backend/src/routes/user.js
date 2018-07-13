const passport = require('passport');
const router = require('express').Router();
const User = require('../handlers/user');
const Game = require('../handlers/game');
const Account = require('../handlers/account');

const gameHandler = new Game();
const userHandler = new User();
const accountHandler = new Account();

/**
 * @swagger
 * /user/game:
 *      get:
 *          tags:
 *              - user
 *          description: Get all games
 *          produces:
 *              - application/json
 *          parameters:
 *              - name: titie
 *                description: title of a game
 *                required: false
 *                type: string
 *                in: query
 *              - name: limit
 *                description: Limit
 *                required: false
 *                default: 10
 *                type: number
 *                in: query
 *              - name: offset
 *                description: Offset
 *                required: false
 *                default: 0
 *                type: number
 *                in: query
 *          responses:
 *              200:
 *                  description: An array of games
 *              400:
 *                  description: Error message
 */
router.get('/game', passport.authenticate('jwt.user', { session: false }), (req, res) => {
    req.query.title == undefined ?
        gameHandler.getGames(req, res) :
        gameHandler.getGameByTitle(req, res);
});

/**
 * @swagger
 * /user/account/game:
 *      get:
 *          tags:
 *              - user
 *          description: Get games on current account
 *          produces:
 *              - application/json
 *          parameters:
 *              - name: limit
 *                description: Limit
 *                required: false
 *                default: 10
 *                type: string
 *                in: query
 *              - name: offset
 *                description: Offset
 *                required: false
 *                default: 0
 *                type: string
 *                in: query
 *          responses:
 *              200:
 *                  description: An array of games
 *              400:
 *                  description: Error message
 */
router.get('/account/game', passport.authenticate('jwt.user', { session: false }), (req, res) => {
    accountHandler.getAccountGames(req, res)
})
/**
 * @swagger
 * /user/leaderboard/all:
 *      get:
 *          tags:
 *              - user
 *          description: Get all games
 *          produces:
 *              - application/json
 *          parameters:
 *              - name: limit
 *                description: Limit
 *                required: false
 *                default: 10
 *                type: string
 *                in: query
 *              - name: offset
 *                description: Offset
 *                required: false
 *                default: 0
 *                type: string
 *                in: query
 *          responses:
 *              200:
 *                  description: An array of leaderoboard
 *              400:
 *                  description: Error message
 */
router.get('/leaderboard/all', passport.authenticate('jwt.user', { session: false }), (req, res) => {
    accountHandler.getLeaderboard(req, res)
})

/**
 * @swagger
 * /user/leaderboard/game:
 *      get:
 *          tags:
 *              - user
 *          description: Get leaderboard by game
 *          produces:
 *              - application/json
 *          parameters:
 *              - name: limit
 *                description: Limit
 *                required: false
 *                default: 10
 *                type: string
 *                in: query
 *              - name: offset
 *                description: Offset
 *                required: false
 *                default: 0
 *                type: string
 *                in: query
 *              - name: gameid
 *                description: Game id
 *                required: true
 *                type: string
 *                in: query
 *          responses:
 *              200:
 *                  description: An array of leaderoboard
 *              400:
 *                  description: Error message
 */
router.get('/leaderboard/game', passport.authenticate('jwt.user', { session: false}), (req, res) => {
        accountHandler.getLeaderboardByGameId(req, res)
})

/**
 * @swagger
 * /user/leaderboard/account:
 *      get:
 *          tags:
 *              - user
 *          description: Get leaderboard by game
 *          produces:
 *              - application/json
 *          parameters:
 *              - name: limit
 *                description: Limit
 *                required: false
 *                default: 10
 *                type: string
 *                in: query
 *              - name: offset
 *                description: Offset
 *                required: false
 *                default: 0
 *                type: string
 *                in: query
 *              - name: gameid
 *                description: Game id
 *                required: true
 *                type: string
 *                in: query
 *          responses:
 *              200:
 *                  description: An array of leaderoboard
 *              400:
 *                  description: Error message
 */
router.get('/leaderboard/account', passport.authenticate('jwt.user', { session: false}), (req, res) => {
    accountHandler.getAccountLeaderboard(req, res)
})

/**
 * @swagger
 * /user/avatar/add:
 *      post:
 *          tags:
 *              - user
 *          description: Add avatar to account
 *          produces:
 *              - application/json
 *          parameters:
 *              - name: avatar
 *                description: User avatar
 *                required: true
 *                type: file
 *                in: formData
 *          responses:
 *              200:
 *                  description: Success message
 *              400:
 *                  description: Error message
 */
router.post('/avatar/add', passport.authenticate('jwt.user', { session: false}), (req, res) => {
    userHandler.addAvatar(req, res)
})

module.exports = router;