const express = require('express');
const app = express()
const { generateUploadURL } = require('../../helpers/s3');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

app.options('*', cors());
app.use(express.static('front'))
app.use(cors());



async function getUploadUrl(req, res) {
    const url = await generateUploadURL()
    res.send({url})
}

module.exports = {
    getUploadUrl: getUploadUrl
}
