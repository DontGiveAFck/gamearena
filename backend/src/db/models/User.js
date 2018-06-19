const Sequelize = require('sequelize');
const sequelize = require('../database');

module.exports = sequelize.define('users', {
    login: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false,
        validate: {
            len: [5,20]
        }
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            len: [1,260]
        }
    },
    email: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false,
        validate: {
            isEmail: true
        }
    },
    username: {
        type: Sequelize.STRING,
        validate: {
            len: [5,20]
        }
    }
});