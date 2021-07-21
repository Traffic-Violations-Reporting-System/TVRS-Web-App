'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class complaint extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  complaint.init({
    description: DataTypes.STRING,
    location: DataTypes.STRING,
    status: DataTypes.INTEGER,
    user_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'complaint',
  });
  return complaint;
};