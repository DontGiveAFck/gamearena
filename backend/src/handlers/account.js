const db = require('../db/database')
const jwt = require('jsonwebtoken')

module.exports = class Account {
    constructor() {
        this.accountTable = db.accounts
        this.accountTable.sync( {force: false} );
        this.accountsGamesTable = db.accountsgames
        this.accountsGamesTable.sync( {force: false} )
        this.leaderboardsTable = db.leaderboards
        this.leaderboardsTable.sync( {force: false} )
    }

    async setBalance(req, res) {
        try {
            let newBalance = req.body.newbalance;
            let login = req.body.login;
            const account = await this.accountTable.update({
                balance: newBalance
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
            const offset = req.query.offset || 0
            const limit = parseInt(req.query.limit) || 10;
            const users = await this.accountTable.findAll({
                offset: offset,
                limit: limit
            });
            res.status(200).json(users);
        } catch (err) {
            res.status(400).json(JSON.stringify({error: err.code}));
        }
    }

    async addGameToAccount(req, res) {
        try {
            const gameId = parseInt(req.body.gameid)
            const accountId = parseInt(req.body.accountid)
            const account = await this.accountTable.findOne({
                where: {
                    id: accountId
                }
            });
            account.addGame(gameId)

            const unit = this.leaderboardsTable.build({
                accountId: accountId,
                gameId: gameId
            })

            await unit.save()
            res.status(200).json({'result': 'game added'})
        } catch (err) {
            console.log(err)
        }
    }

    async getAccountGames(req, res) {
        try {
            const token = req.cookies.token
            const decoded = jwt.decode(token, {complete: true})
            const userId = decoded.payload.id
            const account = await this.accountTable.findOne({
                where: {
                    userId: userId
                }
            })
           // console.log('Account:', account)
            const games = await account.getGames()
            res.status(200).json(games)
        } catch (err) {
            res.status(400).json(JSON.stringify(err))
        }
    }

    async removeGameFromAccount(req, res) {
        try {
            const gameId = req.body.gameid
            const accountId = req.body.accountid

            await this.leaderboardsTable.destroy({
                where: {
                    gameId: gameId,
                    accountId: accountId
                }
            })
            const deletedGame = await this.accountsGamesTable.destroy({
                where: {
                    gameId: gameId,
                    accountId: accountId
                }
            });
            res.status(200).json(JSON.stringify(deletedGame));
        } catch (err) {
            res.status(400).json(JSON.stringify({error: err}))
        }
    }

    async getScores(req, res) {
        const offset = req.query.offset || 0
        const limit = req.query.limit || 10
        try {
            const scores = await this.leaderboardsTable.findAll({
                order: [['score', 'DESC']],
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
        const gameId = req.query.gameid
        try {
            const scores = await this.leaderboardsTable.findAll({
                order: [['score', 'DESC']],
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
            const scores = await this.leaderboardsTable.findAll({
                order: [['score', 'DESC']],
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

                const scores = await this.leaderboardsTable.update({
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