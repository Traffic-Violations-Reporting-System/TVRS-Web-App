const {sequelize}=require('./models');
const webRoute =require("./startup/web/routes");
const mobileUsersRoute = require('./router/mobile/user');
const bodyParser = require('body-parser');
const express  =require('express');  //return function
let cors = require('cors');
require("dotenv").config();

const app = express();
app.use(bodyParser.json());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}))

webRoute(app);
app.use("/api/v1/mobile/user", mobileUsersRoute);

const port = process.env.PORT ||4000;

app.listen(port,async () => {
    console.log(`Listening on port ${port}...`);
    await sequelize.authenticate();
    console.log('database connected successfully!!!');

});
