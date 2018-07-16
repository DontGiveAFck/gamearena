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
 * /admin/user:
 *      get:
 *          tags:
 *              - admin
 *          description: Get 
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
 *                  description: An array of users
 *              400:
 *                  description: Error message
 */
router.get('/user', passport.authenticate('jwt.admin', { session: false }), (req, res) => {
    userHandler.getUsers(req, res);
})

/**
 * @swagger
 * /admin/user:
 *      delete:
 *          tags:
 *              - admin
 *          description: Remove user by user id
 *          produces:
 *              - application/json
 *          parameters:
 *              - name: userid
 *                description: User id
 *                required: true
 *                type: string
 *                in: dataForm
 *          responses:
 *              200:
 *                  description: Success message
 *              400:
 *                  description: Error message
 */
router.delete('/user', passport.authenticate('jwt.admin', { session: false }), (req, res) => {
    userHandler.removeUserByUserId(req, res);
})

/**
 * @swagger
 * /admin/game:
 *      post:
 *          tags:
 *              - admin
 *          description: Remove user by user id
 *          produces:
 *              - application/json
 *          parameters:
 *              - name: title
 *                description: Game title
 *                required: true
 *                type: string
 *                in: dataForm
 *              - name: description
 *                description: Game description
 *                required: true
 *                type: string
 *                in: dataForm
 *              - name: type
 *                description: Game type
 *                required: false
 *                type: string
 *                in: dataForm
 *          responses:
 *              200:
 *                  description: Success message
 *              400:
 *                  description: Error message
 */
router.post('/game', passport.authenticate('jwt.admin', { session: false } ), (req, res) => {
    gameHandler.addGame(req, res);
})

/**
 * @swagger
 * /admin/game:
 *      delete:
 *          tags:
 *              - admin
 *          description: Remove user by user id
 *          produces:
 *              - application/json
 *          parameters:
 *              - name: title
 *                description: Game title
 *                required: true
 *                type: string
 *                in: dataForm
 *          responses:
 *              200:
 *                  description: Success message
 *              400:
 *                  description: Error message
 */
router.delete('/game', passport.authenticate('jwt.admin', { session: false }), (req, res) => {
    gameHandler.removeGameByGameId(req, res);
})

/**
 * @swagger
 * /admin/gametype:
 *      get:
 *          tags:
 *              - admin
 *          description: Get 
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
 *                  description: An array of game types
 *              400:
 *                  description: Error message
 */
router.get('/gametype', passport.authenticate('jwt.admin', { session: false }), (req, res) => {
    gameHandler.getGameTypes(req, res)
})

/**
 * @swagger
 * /admin/gametype:
 *      post:
 *          tags:
 *              - admin
 *          description: Add game type
 *          produces:
 *              - application/json
 *          parameters:
 *              - name: type
 *                description: Game type
 *                required: true
 *                type: string
 *                in: formData
 *          responses:
 *              200:
 *                  description: Success message
 *              400:
 *                  description: Error message
 */
router.post('/gametype', passport.authenticate('jwt.admin', { session: false }), (req, res) => {
    gameHandler.addGameType(req, res)
})

/**
 * @swagger
 * /admin/account/setbalance:
 *      put:
 *          tags:
 *              - admin
 *          description: Set account balance
 *          produces:
 *              - application/json
 *          parameters:
 *              - name: newbalance
 *                description: New account balance
 *                required: true
 *                type: string
 *                in: formData
 *              - name: userid
 *                description: User id
 *                required: true
 *                type: string
 *                in: formData
 *          responses:
 *              200:
 *                  description: Success message
 *              400:
 *                  description: Error message
 */
router.put('/account/setbalance', passport.authenticate('jwt.admin', { session: false }), (req, res) => {
    accountHandler.setBalance(req, res);
})

/**
 * @swagger
 * /admin/account/game:
 *      post:
 *          tags:
 *              - admin
 *          description: Add game to account 
 *          produces:
 *              - application/json
 *          parameters:
 *              - name: gameid
 *                description: Game id
 *                required: true
 *                type: string
 *                in: formData
 *              - name: userid
 *                description: User id
 *                required: true
 *                type: string
 *                in: formData
 *          responses:
 *              200:
 *                  description: Success message
 *              400:
 *                  description: Error message
 */
router.post('/account/game', passport.authenticate('jwt.admin', { session: false }), (req, res) => {
    accountHandler.addGameToAccount(req, res)
})

/**
 * @swagger
 * /admin/account/game:
 *      delete:
 *          tags:
 *              - admin
 *          description: Remove game from account
 *          produces:
 *              - application/json
 *          parameters:
 *              - name: gameid
 *                description: Game id
 *                required: true
 *                type: string
 *                in: dataForm
 *              - name: accountid
 *                description: Account id
 *                required: true
 *                type: string
 *                in: dataForm
 *          responses:
 *              200:
 *                  description: Success message
 *              400:
 *                  description: Error message
 */
router.delete('/account/game', passport.authenticate('jwt.admin', { session: false }), (req, res) => {
    accountHandler.removeGameFromAccount(req, res)
})

/**
 * @swagger
 * /admin/account/leaderboard:
 *      put:
 *          tags:
 *              - admin
 *          description: Set account balance
 *          produces:
 *              - application/json
 *          parameters:
 *              - name: newscore
 *                description: New account balance
 *                required: true
 *                type: string
 *                in: formData
 *              - name: accountid
 *                description: Account id
 *                required: true
 *                type: string
 *                in: formData
 *              - name: gameid
 *                description: Game id
 *                required: true
 *                type: string
 *                in: formData
 *          responses:
 *              200:
 *                  description: Success message
 *              400:
 *                  description: Error message
 */
router.put('/account/leaderboard', passport.authenticate('jwt.admin', { session: false }), (req, res) => {
    accountHandler.setLeaderboard(req, res)
})
/**
 * @swagger
 * /admin/makeadmin:
 *      put:
 *          tags:
 *              - admin
 *          description: Give admin rights to user
 *          produces:
 *              - application/json
 *          parameters:
 *              - name: id
 *                description: User id
 *                required: true
 *                type: string
 *                in: formData
 *          responses:
 *              200:
 *                  description: Success message
 *              400:
 *                  description: Error message
 */
router.put('/makeadmin', passport.authenticate('jwt.admin', { session: false }), (req, res) => {
    userHandler.makeAdmin(req, res)
})

module.exports = router