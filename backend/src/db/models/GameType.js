const Sequelize = require('sequelize');
const sequelize = require('../database');

module.exports = sequelize.define('gametypes', {
    type: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false,
        validate: {
            len: [1,50]
        },
        primaryKey: true,
    }
});