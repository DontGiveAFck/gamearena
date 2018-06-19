const GameModel = require('./models/Game');

const GAME_ADDED = 'Game added: ';

module.exports = class Game {
    constructor() {
        this.Table = GameModel;
        this.Table.sync({force: false});
    }

    async addGame(req, res) {
        let data = req.body;
        let game = this.Table.build({
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
            const destroyed = await this.Table.destroy({
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
            const game = await this.Table.findOne({
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
            const games = await this.Table.findAll();
            res.status(200).json(JSON.stringify(games));
        } catch(err) {
            res.status(400).json({error: err.code});
            console.log(err);
        }
    }
}