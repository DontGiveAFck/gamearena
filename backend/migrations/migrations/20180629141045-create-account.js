'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('account', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
        userId: {
            type: Sequelize.INTEGER,
            unique: true,
            allowNull: false,
            references: {
                model: 'user',
                key: 'id',
            }
        },
        balance: {
            type: Sequelize.INTEGER,
            allowNull: false,
            defaultValue: 0
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
    return queryInterface.dropTable('account');
  }
};