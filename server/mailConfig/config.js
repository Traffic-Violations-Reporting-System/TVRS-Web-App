require('dotenv').config({ path: __dirname + '/.env' });
const nodemailer = require('nodemailer');
var smtpTransport = require('nodemailer-smtp-transport');


const transport = nodemailer.createTransport(smtpTransport({
   service: process.env.EMAIL_HOST,
   auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
   } 
}));

let sendMail = (mailOptions)=>{
   transport.sendMail(mailOptions, (error, info) => {
     if (error) {
         return console.log(error);
     }
   });
};

module.exports = sendMail;