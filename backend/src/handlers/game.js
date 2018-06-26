const GameModel = require('../db/models/Game');
const GametypeModel = require('../db/models/GameType')

const GAME_ADDED = 'Game added: ';

module.exports = class Game {
    constructor() {
        this.gameTable = GameModel;
        this.gametypeTable = GametypeModel;
        this.gameTable.sync({force: false});
        this.gametypeTable.sync({force: false});
    }

    async addGame(req   , res) {
        let data = req.body;
        let game = this.gameTable.build({
            title: data.title,
            description: data.description,
            type: data.type
        });
        try {
            const user = await game.save();
            console.log(GAME_ADDED, game);
            res.status(200).json(JSON.stringify(user));
        } catch (err) {
            res.status(400).json({error: err.code});
            console.log(err);
        }
    }

    async removeGameByTitle(req, res) {
        try {
            const removed = await this.gameTable.update({
                status: 'removed'
            }, {
                where: {
                    title: req.body.title
                }
            })

            res.status(200).json(JSON.stringify(removed));
        } catch (err) {
            res.status(400).json({error: err.code});
            console.log(err);
        }
    }

    async getGameByTitle(req, res) {
        try {
            const game = await this.gameTable.findOne({
                where: {
                    title: req.query.title
                }
            });
            res.status(200).json(JSON.stringify(game));
        } catch(err) {
            res.status(400).json({error: err.code});
            console.log(err);
        }
    }

    async getGames(req, res) {
        try {
            const limit = req.query.limit || 10
            const games = await this.gameTable.findAll({
                limit: limit
            });
            res.status(200).json(JSON.stringify(games));
        } catch(err) {
            res.status(400).json({error: err.code});
            console.log(err);
        }
    }

    async addGameType(req, res) {
        let gametype = req.body.gametype;
        let buildGametype = this.gametypeTable.build({
            gametype: gametype
        });
        try {
            const addedGametype = await buildGametype.save();
            console.log(GAME_ADDED, addedGametype);
            res.status(200).json(JSON.stringify(addedGametype));
        } catch (err) {
            res.status(400).json({error: err.code});
            console.log(err);
        }
    }

    async getGameTypes(req, res) {
        try {
            const limit = req.query.limit || 10
            const types = await this.gametypeTable.findAll({
                limit: limit
            });
            res.status(200).json(JSON.stringify(types));
        } catch(err) {
            res.status(400).json({error: err.code});
            console.log(err);
        }
    }
}