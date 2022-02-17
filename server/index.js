const express  =require('express');  //return function
const {sequelize}=require('./models');
require("dotenv").config();

const startupMiddleware = require("./startup/essentialMiddleware");
const webRoute =require("./startup/web/routes");
const mobileUsersRoute = require('./router/mobile/user');

const app = express();
startupMiddleware(app);
webRoute(app);

//this comment is for demostration purpose only 

app.use("/api/v1/mobile/user", mobileUsersRoute);

const port = process.env.PORT ||4000;

app.listen(port,async () => {
    console.log(`Listening on port ${port}...`);
    await sequelize.authenticate();
    console.log('database connected successfully!!!');

});
