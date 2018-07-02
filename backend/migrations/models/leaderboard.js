'use strict';
module.exports = (sequelize, DataTypes) => {
  var Leaderboard = sequelize.define('leaderboard', {
      score: {
          type: DataTypes.INTEGER,
          defaultValue: 0,
          allowNull: false
      },
      accountId: {
          type: DataTypes.INTEGER,
          unique: 'unique'
      },
      gameId: {
          type: DataTypes.INTEGER,
          unique: 'unique'
      }
  }, {});
  Leaderboard.associate = function(models) {
    // associations can be defined here
  };
  return Leaderboard;
};