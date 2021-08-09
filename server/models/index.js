'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];
const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(file => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.webusers = require("./webuser")(sequelize, Sequelize);
db.webuserroles = require("./webuserrole")(sequelize, Sequelize);

db.webuserroles.hasMany(db.webusers, { as: "webusers" });
db.webusers.belongsTo(db.webuserroles, {
  foreignKey: "role_id",
  as: "role",
});



db.Accept =require("./accept.js")(sequelize, Sequelize);
db.Person =require("./person.js")(sequelize, Sequelize);
db.Accept_People =require("./accept_people.js")(sequelize, Sequelize);
db.Vehicle =require("./vehicle.js")(sequelize, Sequelize);
db.Accept_Vehicle =require("./accept_vehicle.js")(sequelize, Sequelize);
db.Complaint =require("./complaint")(sequelize, Sequelize);
db.Reject =require("./reject")(sequelize, Sequelize);
db.Review =require("./review")(sequelize, Sequelize);
db.Complain_Police =require("./complain_invoive_police")(sequelize, Sequelize);

db.Accept.belongsToMany(db.Person, { through: db.Accept_People, foreignKey: 'acceptId' });
db.Person.belongsToMany(db.Accept, { through: db.Accept_People, foreignKey: 'peopleId' });

db.Accept.belongsToMany(db.Vehicle, { through: db.Accept_Vehicle, foreignKey: 'acceptId' });
db.Vehicle.belongsToMany(db.Accept, { through: db.Accept_Vehicle, foreignKey: 'vehicleId' });

db.Police = require("./webuser")(sequelize, Sequelize);
db.Complaint.belongsToMany(db.Police, { through: db.Complain_Police, foreignKey: 'complaineId' });
db.Police.belongsToMany(db.Complaint, { through: db.Complain_Police, foreignKey: 'userId' });


module.exports = db;



