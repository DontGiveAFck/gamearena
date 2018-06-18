const router = require('express').Router();
const User = require('./user');
const Game = require('./game');

const gameHandler = new Game();
const userHandler = new User();

router.get('/users', (req, res) => {
    req.query.login == undefined ?
        userHandler.getUsers(req, res) :
        userHandler.getUserByLogin(req, res);
});
router.put('/users', (req, res) => {
    userHandler.addUser(req, res);
});
router.delete('/users', (req, res) => {
    userHandler.removeUserByLogin(req, res);
});

router.get('/games', (req, res) => {
    req.query.title == undefined ?
        gameHandler.getGames(req, res) :
        gameHandler.getGameByLogin(req, res);
});
router.put('/games', (req, res) => {
    gameHandler.addGame(req, res);
});
router.delete('/games', (req, res) => {
    gameHandler.removeGameByTitle(req, res);
});

module.exports = router;