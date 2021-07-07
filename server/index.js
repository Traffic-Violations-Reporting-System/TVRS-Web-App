// const {sequelize,webuser,webuserrole}=require('./models');
const authRoute = require('./router/web/auth.route');
const resetRoute =require('./router/web/reset.route');
const express  =require('express');  //return function
let cors = require('cors');
// const bcrypt = require("bcrypt");
// const jwt = require("jsonwebtoken");
// const { reset } = require('nodemon');
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}))

app.use('/web', authRoute);
app.use('/web', resetRoute);

const port =process.env.PORT ||4000;
app.listen(port,async () => {
    console.log(`Listening on port ${port}...`);
    await sequelize.authenticate();
    console.log('database connected successfully!!!');

});