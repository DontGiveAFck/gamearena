const db = require('../db/database')
const GAME_ADDED = 'Game added: ';

const successObject = {
    "result": "successful"
}

module.exports = class Game {
    constructor() {
        db.game.sync({force: false});
        db.gametype.sync({force: false});
    }

    async addGame(req   , res) {
        let data = req.body;
        let game = db.game.build({
            title: data.title,
            description: data.description,
            type: data.type
        });
        try {
            const user = await game.save();
            res.status(200).json(successObject);
        } catch (err) {
            res.status(400).json(err);
        }
    }

    async removeGameByTitle(req, res) {
        try {
            await db.game.update({
                status: 'removed'
            }, {
                where: {
                    title: req.body.title
                }
            })
            res.status(200).json(successObject);
        } catch (err) {
            res.status(400).json(err);
        }
    }

    async getGameByTitle(req, res) {
        try {
            const game = await db.game.findOne({
                where: {
                    title: req.query.title
                }
            });
            res.status(200).json(game);
        } catch(err) {
            res.status(400).json(err);
        }
    }

    async getGames(req, res) {
        try {
            const offset = req.query.offset || 0
            const limit = req.query.limit || 10
            const games = await db.game.findAll({
                offset: offset,
                limit: limit
            });
            res.status(200).json(games);
        } catch(err) {
            res.status(400).json(err);
        }
    }

    async addGameType(req, res) {
        let gametype = req.body.type;
        let buildGametype = db.gametype.build({
            type: gametype
        });
        try {
            await buildGametype.save();
            res.status(200).json(successObject);
        } catch (err) {
            res.status(400).json(err);
        }
    }

    async getGameTypes(req, res) {
        try {
            const offset = req.query.offset || 0
            const limit = req.query.limit || 10
            const types = await db.gametype.findAll({
                offset: offset,
                limit: limit
            });
            res.status(200).json(types);
        } catch(err) {
            res.status(400).json(err);
            console.log(err);
        }
    }
}