const videoUploadRoute = require('./router/mobile/video.upload.route');
const mobileUsersRoute = require('./router/mobile/user');
const complainRoute = require('./router/mobile/complain.route');
const express  =require('express');  //return function
const {sequelize}=require('./models');
require("dotenv").config();

const startupMiddleware = require("./startup/essentialMiddleware");
const webRoute =require("./startup/web/routes");

const app = express();
startupMiddleware(app);
webRoute(app);

app.use("/api/v1/mobile/user", mobileUsersRoute);
app.use("/api/v1/mobile/complain", complainRoute);
app.use("/api/v1/mobile/video-upload", videoUploadRoute);


const port = process.env.PORT ||4000;

app.listen(port,async () => {
    console.log(`Listening on port ${port}...`);
    await sequelize.authenticate();
    console.log('database connected successfully!!!');

});
