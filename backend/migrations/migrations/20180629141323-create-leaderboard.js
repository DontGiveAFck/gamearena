'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('leaderboards', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
        score: {
            type: Sequelize.INTEGER,
            defaultValue: 0,
            allowNull: false
        },
        accountId: {
            type: Sequelize.INTEGER,
            unique: 'unique'
        },
        gameId: {
            type: Sequelize.INTEGER,
            unique: 'unique'
        },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Leaderboards');
  }
};