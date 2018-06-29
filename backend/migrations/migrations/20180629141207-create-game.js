'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('games', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
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
        status: {
            type: Sequelize.STRING,
            defaultValue: 'active'
        },
        gametype: {
            type: Sequelize.STRING,
            allowNull: false,
            references: {
                model: GameType,
                key: 'gametype'
            }

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
    return queryInterface.dropTable('Games');
  }
};