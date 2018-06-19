const Sequelize = require('sequelize');
const sequelize = require('../database');

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
    }
});