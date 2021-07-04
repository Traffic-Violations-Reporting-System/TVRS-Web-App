'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class webuser extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({webuserrole}) {
      // define association here
      this.belongsTo(webuserrole,{foreignKey:'role_id'})
    }

  };
  webuser.init({
    first_name: {
      type:DataTypes.STRING,
      allowNull:false
    },
    last_name: {
      type:DataTypes.STRING,
      allowNull:false
    },
    email: {
      type:DataTypes.STRING,
      allowNull:false
    },
    password: {
      type:DataTypes.STRING,

    },
    role_id: {
      type:DataTypes.INTEGER,
      allowNull:false
    },
    status: {
      type:DataTypes.BOOLEAN,
      allowNull:false
    },
    nic: {
      type:DataTypes.STRING,
      allowNull:false
    },
    service_id: {
      type:DataTypes.STRING,
      allowNull:false
    },

  }, {
    sequelize,
    modelName: 'webuser',
  });
  return webuser;
};