'use strict';
module.exports = (sequelize, DataTypes) => {
  var Account = sequelize.define('accounts', {
      login: {
          type: DataTypes.STRING,
          unique: true,
          allowNull: false,
          validate: {
              len: [5, 20]
          }/*,

            references: {
                model: UserModel,
                key: 'login',
            }
            */
      },
      balance: {
          type: DataTypes.INTEGER,
          allowNull: false,
          defaultValue: 0
      },
      status: {
          type: Sequelize.STRING,
          enum: ['active', 'removed', 'blocked'],
          defaultValue: 'active'
      }
  }, {});
  Account.associate = function(models) {
      Account.belongsToMany(models.game, {through: models.accountgame})
      Account.hasMany(models.leaderboard)
      Account.belongsTo(models.user)
  };
  return Account;
};