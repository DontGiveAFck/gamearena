const Sequelize = require('sequelize')
const sequelize = require('../database')
const GameModel = require('../models/Game')
const AccountModel = require('../models/Account')

module.exports = sequelize.define('leaderboards', {
    gameId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: GameModel,
            key: 'id'
        }
    },
    accountId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: AccountModel,
            key: 'id'
        }
    },
    score: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
        allowNull: false
    }
})