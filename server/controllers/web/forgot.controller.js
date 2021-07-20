const { webuser, reset_password } = require('../../models');
require('dotenv').config({ path: __dirname + '/.env' });
var sendMail = require('../../mailConfig/config');
const { forgotValidate} = require('../../validation/web/reset.validations');
// const bcrypt = require('bcrypt');
// const jwt = require("jsonwebtoken");
const crypto = require('crypto');


exports.forgotController = async (req, res, next) => {

   try{
        const { error } = forgotValidate(req.body);    
        if (error) return res.status(400).send(error.details[0].message);

        const { email } = req.body;
        
        const user = await webuser.findOne(
           { where: { email }, attributes: ['id', 'status'] }
        );

        if (!user) return res.status(400).send("invalid email address");
       
        if(!user.status) return res.status(400).send("user is not active");

      
        const token = crypto.randomBytes(64).toString('base64');
        var expireDate = new Date();
        // expireDate = expireDate.replace("IST", "SLST")
       
        expireDate.setDate(expireDate.getDate() + 1);
      
       const resetStatus = await reset_password.create({
            user_id: user.id,
            email: email,
            expire: expireDate,
            auth_token: token,
            used: 0
       });
       
        if (!resetStatus)return res.status(400).send("Token setup failed. Try again!");

        // sendMail({
        //     from: process.env.EMAIL_USER,
        //     to: email,
        //     subject: "Reset Password Link",
        //     text: 'To reset your password, please click the link below.\n\n' + 'http://localhost:3000' + '/set?token=' + encodeURIComponent(token) + '&email=' + email + 'This is only valid 2days only.If you didn\'t want please ignore this email'
        // });
        
        //if (!mailStatus) return res.status(400).send("Mail sending failed. Try again!"); 
        const subject = "Reset Password Link";
        const mailStatus = await sendMail({ email: email, subject:subject, confirmationCode:token });
        
        if (!mailStatus) return res.status(400).send("Mail sending failed. Try again!"); 
        
        return res.status(200).send("Check your email account");
       

   }catch (e) {
       return res.status(500).send("Internal Server Error")
   }
}


