const Sequelize = require('sequelize');
const sequelize = require('../database');
const AccountModel = require('./Account');
const GameModel = require('./Game');

module.exports = sequelize.define('accounts_games', {
    accountId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        references: {
            model: AccountModel,
            key: 'id',
        }
    },
    gameId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        references: {
            model: GameModel,
            key: 'id',
        }
    }
});