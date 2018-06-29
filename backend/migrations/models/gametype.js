'use strict';
module.exports = (sequelize, DataTypes) => {
  var Gametype = sequelize.define('gametypes', {
      type: {
          type: Sequelize.STRING,
          unique: true,
          allowNull: false,
          validate: {
              len: [1,50]
          },
          primaryKey: true,
      }
  }, {});
  Gametype.associate = function(models) {
    // associations can be defined here
  };
  return Gametype;
};