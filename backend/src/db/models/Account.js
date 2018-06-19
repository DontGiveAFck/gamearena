const Sequelize = require('sequelize');
const sequelize = require('../database');
const UserModel = require('./User');

module.exports = sequelize.define('accounts', {
    login: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false,
        validate: {
            len: [5,20]
        },
        references: {
            model: UserModel,
            key: 'login',
        }
    },
    balance: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0
    },
});