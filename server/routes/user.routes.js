module.exports = app => {
   const webUsers = require("../controllers/web/user.controller.js");
   

   app.get("/login/:email", webUsers.findUser);
   
 };