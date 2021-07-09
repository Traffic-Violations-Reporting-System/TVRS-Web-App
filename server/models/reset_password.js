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
    user_id:  {
      type:DataTypes.INTEGER,
      allowNull:false
    },
    email: {
      type:DataTypes.STRING,
      allowNull:false
    },
    auth_token:  {
      type:DataTypes.STRING,
      allowNull:false
    },
    used:   {
      type:DataTypes.INTEGER,
      allowNull:false
    },
    expire: {
      type:DataTypes.DATE,
      allowNull:false
    },
  }, {
    sequelize,
    modelName: 'reset_password',
  });
  return reset_password;
};