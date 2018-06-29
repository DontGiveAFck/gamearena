'use strict';
module.exports = (sequelize, DataTypes) => {
  var Leaderboard = sequelize.define('leaderboards', {
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
      }
  }, {});
  Leaderboard.associate = function(models) {
    // associations can be defined here
  };
  return Leaderboard;
};