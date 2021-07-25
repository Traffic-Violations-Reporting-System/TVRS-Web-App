const express = require('express');

const authRoute = require('../../router/web/auth.route');
const resetRoute =require('../../router/web/reset.route');
const userRoute =require('../../router/web/user/user.route');
const userRoleRoute =require('../../router/web/user/userRole.route');


module.exports =function (app) {
    app.use('/web', authRoute);
    app.use('/web', resetRoute);
    app.use('/web/user', userRoute);
    app.use('/web/user', userRoleRoute);
}