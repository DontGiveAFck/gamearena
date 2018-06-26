const Sequelize = require('sequelize');
const sequelize = require('../database');
const GameType = require('./GameType')

module.exports = sequelize.define('games', {
    title: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false,
        validate: {
            len: [5,20]
        }
    },
    description: {
        type: Sequelize.STRING,
        allowNull: true
    },
    gametype: {
        type: Sequelize.STRING,
        allowNull: false,
        references: {
            model: GameType,
            key: 'gametype'
        }
    },
    status: {
        type: Sequelize.STRING,
        defaultValue: 'active' // removed, blocked
    }
});