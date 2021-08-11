const express  =require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

module.exports = function(app) {
    app.use(bodyParser.json());
    app.use(cors());
    app.use(express.json());
    app.use(express.urlencoded({extended: true}))
};