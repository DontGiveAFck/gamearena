const AccountModel = require('../db/models/Account');
const AccountsGamesModel = require('../db/models/AccountsGames')
const Leaderboards = require('../db/models/Leaderboards')

module.exports = class Account {
    constructor() {
        this.accountTable = AccountModel;
        this.accountTable.sync( {force: false} );
        this.accountsGamesTable = AccountsGamesModel
        this.accountsGamesTable.sync( {force: false} )
        this.LeaderboardsTable = Leaderboards
        this.LeaderboardsTable.sync( {force: false} )
    }

    async setBalance(req, res) {
        try {
            let newBalance = req.body.newbalance;
            let login = req.body.login;
            const account = await this.accountTable.update({
                balance: newBalance,
            }, {
                where: {
                    login: login
                }
            });
            res.status(200).json(account);
        } catch (err) {
            res.status(400).json(JSON.stringify({error: err.code}));
            console.log(err);
        }
    }

    async getAccounts(req, res) {
        try {
            let limit = parseInt(req.query.limit) || 10;
            const users = await this.accountTable.findAll({
                order: [['balance', 'DESC']],
                limit: limit
            });
            res.status(200).json(users);
        } catch (err) {
            res.status(400).json(JSON.stringify({error: err.code}));
        }
    }

    async addGameToAccount(req, res) {
        try {
            const gameId = req.body.gameid
            const accountId = req.body.accountId
            const gameAccount = this.accountsGamesTable.build({
                accountId: accountId,
                gameId: gameId
            })
            const insertedGameAccount = await gameAccount.save()
            res.status(200).json(insertedGameAccount)
        } catch (err) {
            console.log(err)
        }
    }

    async removeGameFromAccount(req, res) {
        try {
            const gameId = req.body.gameid
            const accountId = req.body.accountId
            const destroyed = await this.accountsGamesTable.destroy({
                where: {
                    gameId: gameId,
                    accountId: accountId
                }
            });
            res.status(200).json(JSON.stringify(destroyed));
        } catch (err) {
            res.status(400).json(JSON.stringify({error: err}))
        }
    }

    async getScores(req, res) {
        const offset = req.query.offset || 0
        const limit = req.query.limit || 10
        try {
            const scores = await this.LeaderboardsTable.findAll({
                offset: offset,
                limit: limit
            })
            res.status(200).json(JSON.stringify(scores))
        } catch (err) {
            res.status(400).json(JSON.stringify({error: err}))
        }
    }

    async getScoresByGameId(req, res) {
        const offset = req.query.offset || 0
        const limit = req.query.limit || 10
        const gameId = req.query.gameId
        try {
            const scores = await this.LeaderboardsTable.findAll({
                offset: offset,
                limit: limit,
                where: {
                    gameId: gameId
                }
            })
            res.status(200).json(JSON.stringify(scores))
        } catch (err) {
            res.status(400).json(JSON.stringify({error: err}))
        }
    }

    async getScoresByAccountId(req, res) {
        const offset = req.query.offset || 0
        const limit = req.query.limit || 10
        const accountId = req.query.accountId
        try {
            const scores = await this.LeaderboardsTable.findAll({
                offset: offset,
                limit: limit,
                where: {
                    accountId: accountId
                }
            })
            res.status(200).json(JSON.stringify(scores))
        } catch (err) {
            res.status(400).json(JSON.stringify({error: err}))
        }
    }

    async setScore(req, res){
        try {
            const newScore = req.body.score
            const gameId = req.body.gameid
            const accountId = req.body.accountid

                const scores = await this.LeaderboardsTable.update({
                    score: newScore
                }, {
                    where: {
                        gameId: gameId,
                        accountId: accountId
                    }
                })
                res.status(200).json(JSON.stringify(scores))

            } catch(err) {
            res.status(400).json(JSON.stringify({error: err}))
        }
    }
}