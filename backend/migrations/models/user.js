'use strict';
module.exports = (sequelize, DataTypes) => {
  var User = sequelize.define('users', {
      login: {
          type: DataTypes.STRING,
          unique: true,
          allowNull: false,
          validate: {
              len: [5,20]
          }
      },
      password: {
          type: DataTypes.STRING,
          allowNull: false,
          validate: {
              len: [1,260]
          }
      },
      email: {
          type: DataTypes.STRING,
          unique: true,
          allowNull: false,
          validate: {
              isEmail: true
          }
      },
      username: {
          type: DataTypes.STRING,
          validate: {
              len: [5,20]
          }
      },
      admin: {
          type: DataTypes.BOOLEAN,
          defaultValue: 0,
      },
      avatar: {
          type: DataTypes.STRING,
          allowNull: true
      },
      status: {
          type: DataTypes.STRING,
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