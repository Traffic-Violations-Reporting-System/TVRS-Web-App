 
const authRoute = require('./router/web/auth.route');
const resetRoute =require('./router/web/reset.route');

// const {sequelize,webuser,webuserrole}=require('./models');
const {sequelize}=require('./models');
const userRoute =require('./router/web/user/user.route');
const userRoleRoute =require('./router/web/user/userRole.route');

const mobileUsersRoute = require('./router/mobile/user');
const bodyParser = require('body-parser');
const express = require('express');  //return function

let cors = require('cors');
require("dotenv").config();

const app = express();
app.use(bodyParser.json());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}))

app.use('/web', authRoute);
app.use('/web', resetRoute);
app.use("/api/v1/mobile/user", mobileUsersRoute);


app.use('/web/user', userRoute);
app.use('/web/user', userRoleRoute);

const port = process.env.PORT ||4000;

app.listen(port,async () => {
    console.log(`Listening on port ${port}...`);
    await sequelize.authenticate();
    console.log('database connected successfully!!!');

});
