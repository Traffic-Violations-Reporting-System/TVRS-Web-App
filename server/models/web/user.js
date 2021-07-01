const sql = require("../../startup/db.js");

// constructor
const WebUser = function (webuser) {
  this.id = webuser.id; 
  this.email = webuser.email;
  this.password = webuser.password;
  this.active = webuser.active;
  this.first_name = webuser.first_name;
  this.last_name = webuser.last_name;
  this.service_id = webuser.service_id;
  this.user_role = webuser.user_role;
  this.region = webuser.region;
};

WebUser.FindByEmail = (email, result) => {
  sql.query(`SELECT * FROM web_user WHERE email = ${email}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found user: ", res[0]);
      result(null, res[0]);
      return;
    }
    
    result({ kind: "not_found" }, null);
  });
};

module.exports = WebUser;