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
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    role_id: DataTypes.INTEGER,
    status: DataTypes.BOOLEAN,
    nic: DataTypes.STRING,
    service_id: DataTypes.STRING,
    region: DataTypes.STRING,
    salt: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'webuser',
  });
  return webuser;
};