'use strict';
module.exports = (sequelize, DataTypes) => {
  var Game = sequelize.define('games', {
      title: {
          type: DataTypes.STRING,
          unique: true,
          allowNull: false,
          validate: {
              len: [5,20]
          }
      },
      description: {
          type: DataTypes.STRING,
          allowNull: true
      },
      status: {
          type: DataTypes.STRING,
          enum: ['active', 'removed', 'blocked'],
          defaultValue: 'active' // removed, blocked
      }
  }, {});
  Game.associate = function(models) {
      Game.belongsToMany(models.account, {through: models.accountgame})
      Game.belongsTo(models.gametype, {as: 'gametype',foreignKey: 'type'})
      Game.hasMany(models.leaderboard)
  };
  return Game;
};