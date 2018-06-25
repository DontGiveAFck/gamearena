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
            description: data.description
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
            //const game = await this.Table.create({title: req.body.title});
            const destroyed = await this.gameTable.destroy({
                where: {
                    title: req.body.title
                }
            });
            res.status(200).json(JSON.stringify(destroyed));
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
        try {
            const gametype = req.body.gametype
            await this.gametypeTable.findAll({
                where: {
                    type: gametype
                }
            });
            res.status(200).json(JSON.stringify(gametype));
        } catch(err) {
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