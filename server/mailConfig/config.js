// require('dotenv').config({ path: __dirname + '/.env' });
// const nodemailer = require('nodemailer');
// var smtpTransport = require('nodemailer-smtp-transport');


// const transport = nodemailer.createTransport(smtpTransport({
//    service: process.env.EMAIL_HOST,
//    auth: {
//       user: process.env.EMAIL_USER,
//       pass: process.env.EMAIL_PASS
//    } 
// }));

// let sendMail = (mailOptions)=>{
//    transport.sendMail(mailOptions, (error, info) => {
//      if (error) {
//          return console.log(error);
//      }
//    });
// };

// module.exports = sendMail;

require('dotenv').config({ path: __dirname + '/.env' });
const nodemailer =require('nodemailer');

const sendEmail = async options  =>{

        const transporter = nodemailer.createTransport({
            host: process.env.MAIL_HOST,
            port:process.env.MAIL_PORT,
            auth: {
                user: process.env.MAIL_USER,
                pass: process.env.MAIL_PASS
            }

        });

        const  mailOptions={
            from: '"Sri Lanka Traffic Department" <TVRS@example.com>',
            to:options.email,
            subject:options.subject,
            text:`Set New Password your account. Submit a PATCH request with your new password to: 
            http://localhost:4000/web/setpassword/${options.confirmationCode}.This is only valid 2days only.If you didn't want please ignore this email`
        };


        await transporter.sendMail(mailOptions);

};
module.exports=sendEmail;