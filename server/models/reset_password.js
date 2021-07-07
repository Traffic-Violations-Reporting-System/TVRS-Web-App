'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class reset_password extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  reset_password.init({
    user_id: DataTypes.INTEGER,
    email: DataTypes.STRING,
    auth_token: DataTypes.STRING,
    used: DataTypes.INTEGER,
    expire: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'reset_password',
  });
  return reset_password;
};