'use strict';
module.exports = (sequelize, DataTypes) => {
  var User = sequelize.define('users', {
      login: {
          type: Sequelize.STRING,
          unique: true,
          allowNull: false,
          validate: {
              len: [5,20]
          }
      },
      password: {
          type: Sequelize.STRING,
          allowNull: false,
          validate: {
              len: [1,260]
          }
      },
      email: {
          type: Sequelize.STRING,
          unique: true,
          allowNull: false,
          validate: {
              isEmail: true
          }
      },
      username: {
          type: Sequelize.STRING,
          validate: {
              len: [5,20]
          }
      },
      admin: {
          type: Sequelize.BOOLEAN,
          defaultValue: 0,
      },
      avatar: {
          type: Sequelize.STRING,
          allowNull: true
      },
      status: {
          type: Sequelize.STRING,
          enum: ['active', 'removed', 'blocked'],
          defaultValue: 'active', // removed, blocked
          allowNull: false
      }
  }, {});
  User.associate = function(models) {
      User.hasOne(models.account)
  };
  return User;
};