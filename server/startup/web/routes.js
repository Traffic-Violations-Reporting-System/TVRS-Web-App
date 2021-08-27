const express = require('express');

const authRoute = require('../../router/web/auth.route');
const resetRoute =require('../../router/web/reset.route');
const userRoute =require('../../router/web/user/user.route');
const userRoleRoute =require('../../router/web/user/userRole.route');
const complaineRoute = require('../../router/web/complaint/complaint.route');
const level3Route = require('../../router/web/level3/level3.route');


module.exports =function (app) {
    app.use('/web', authRoute);
    app.use('/web', resetRoute);
    app.use('/web/user', userRoute);
    app.use('/web/user', userRoleRoute);
    app.use('/web/complaine', complaineRoute);
    app.use('/web/level3', level3Route);
}