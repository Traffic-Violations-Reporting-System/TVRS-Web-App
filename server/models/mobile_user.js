'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class mobile_user extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  mobile_user.init({
    full_name: DataTypes.STRING,
    email: DataTypes.STRING,
    nic: DataTypes.STRING,
    password: DataTypes.STRING,
    region_id: DataTypes.STRING,
    rating: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'mobile_user',
  });
  return mobile_user;
};