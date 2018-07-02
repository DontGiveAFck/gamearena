'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('gametype', {
        type: {
            type: Sequelize.STRING,
            unique: true,
            allowNull: false,
            validate: {
                len: [1,50]
            },
            primaryKey: true,
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
    return queryInterface.dropTable('gametype');
  }
};