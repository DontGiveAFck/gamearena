'use strict';
module.exports = (sequelize, DataTypes) => {
  var AccountGame = sequelize.define('accounts_games', {

  }, {});
  AccountGame.associate = function(models) {
  };
  return AccountGame;
};