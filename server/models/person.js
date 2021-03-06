'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Person extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {


    }
  };
  Person.init({
    ageRange: DataTypes.STRING,
    gender: DataTypes.STRING,
    personStatus: DataTypes.STRING,
    skinColor: DataTypes.STRING,
    nic: DataTypes.STRING,
    address: DataTypes.STRING,
    contactNo: DataTypes.STRING(12),
    acceptId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Person',
  });
  return Person;
};