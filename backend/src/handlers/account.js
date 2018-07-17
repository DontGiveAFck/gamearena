const db = require('../db/database')
const jwt = require('jsonwebtoken')

const successObject = {
    "result": "successful"
}

const errors = {
    addGameError: {
        errors: {
            result: "User already has this game or unfound user/game"
        }
    },
    invalidInput: {
        errors: {
            result: 'Invalid input'
        }
    }

}

module.exports = class Account {
    constructor() {
        db.account.sync( {force: false} )
        db.accountgame.sync( {force: false} )
        db.leaderboard.sync( {force: false} )
    }

    async setBalance(req, res) {
        try {
            let newBalance = req.body.newbalance
            let accountId = req.body.accountid
            await db.account.update({
                balance: newBalance
            }, {
                where: {
                    userId: accountId
                }
            });
            res.status(200).json(successObject);
        } catch (err) {
            res.status(400).json(errors.invalidInput);
        }
    }

    async getAccounts(req, res) {
        try {
            const offset = parseInt(req.query.offset) || 0
            const limit = parseInt(req.query.limit) || 10
            const users = await db.account.findAll({
                offset: offset,
                limit: limit
            });
            res.status(200).json(users);
        } catch (err) {
            res.status(400).json(err);
        }
    }

    async addGameToAccount(req, res) {
        try {
            const gameId = parseInt(req.body.gameid)
            const accountId = parseInt(req.body.accountid)
            const account = await db.account.findOne({
                where: {
                    id: accountId
                }
            });
            await account.addGame(gameId)
            const leaderboard = await db.leaderboard.create({gameId: gameId})
            await account.addLeaderboard(leaderboard)
            res.status(200).json(successObject)
        } catch (err) {
            res.status(400).json(errors.addGameError)
        }
    }

    async getAccountGames(req, res) {
        try {
            const offset = parseInt(req.query.offset) || 0
            const limit = parseInt(req.query.limit) || 10
            const token = req.cookies.token
            const decoded = jwt.decode(token, {complete: true})
            const userId = decoded.payload.id

            const account = await db.account.findOne({
                where: {
                    userId: userId
                }
            })
            const count = await db.accountgame.count({
                where: {
                    accountid: account.id
                }
            })
            const games = await account.getGames({
                attributes: ['id', 'title', 'description', 'type', 'status'],
                limit: limit,
                offset: offset
            })
            const response = {
                count: count,
                games: games
            }
            res.status(200).json(response)
        } catch (err) {
            res.status(400).json(err)
        }
    }

    async removeGameFromAccount(req, res) {
        try {
            const gameId = req.body.gameid
            const accountId = req.body.accountid

            const account = await db.account.findOne({
                where: {
                    id: accountId
                }
            })

            const leaderboard = await db.leaderboard.findOne({
                where: {
                    gameId: gameId,
                    accountId: accountId
                }
            })

            await account.removeLeaderboard(leaderboard)
            await account.removeGame(gameId)
            res.status(200).json(errors.InvalidInput);
        } catch (err) {
            res.status(400).json(err)
        }
    }

    async getLeaderboard(req, res) {
        const offset = parseInt(req.query.offset) || 0
        const limit = parseInt(req.query.limit) || 10
        try {
            const scores = await db.leaderboard.findAll({
                order: [['score', 'DESC']],
                offset: offset,
                limit: limit
            })
            res.status(200).json(scores)
        } catch (err) {
            res.status(400).json(err)
        }
    }

    async getLeaderboardByGameId(req, res) {
        const offset = parseInt(req.query.offset) || 0
        const limit = parseInt(req.query.limit) || 10
        const gameId = req.query.gameid
        try {
            const scores = await db.leaderboard.findAll({
                order: [['score', 'DESC']],
                offset: offset,
                limit: limit,
                where: {
                    gameId: gameId,
                    accountId: {
                        [db.Sequelize.Op.ne]: null
                    }
                }
            })
            res.status(200).json(scores)
        } catch (err) {
            res.status(400).json(err)
        }
    }

    async getAccountLeaderboard(req, res) {
        try {

            const token = req.cookies.token
            const decoded = jwt.decode(token, {complete: true})
            const userId = decoded.payload.id
            const offset = parseInt(req.query.offset) || 0
            const limit = parseInt(req.query.limit) || 10

            const account = await db.account.findOne({
                where: {
                    userId: userId
                }
            })

            console.log('before count')
            const count = await db.leaderboard.count({
                where: {
                    accountId: account.id
                }
            })
            const leaderboards = await account.getLeaderboards({
                attributes: ['gameid', 'score'],
            })
            
            const response = {
                count: count,
                leaderboards: leaderboards
            }

            res.status(200).json(response)
        } catch (err) {
            res.status(400).json(err)
        }
    }

    async setLeaderboard(req, res){
        try {
            const newScore = req.body.score
            const gameId = req.body.gameid
            const accountId = req.body.accountid

            await db.leaderboard.update({
                score: newScore
            }, {
                where: {
                    gameId: gameId,
                    accountId: accountId
                }
            })

            res.status(200).json(successObject)
        } catch(err) {
            console.log(err)
            res.status(400).json(errors.invalidInput)
        }
    }

}