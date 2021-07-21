'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class image_ref extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  image_ref.init({
    reference: DataTypes.STRING,
    complain_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'image_ref',
  });
  return image_ref;
};