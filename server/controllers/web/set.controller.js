const { webuser, reset_password } = require('../../models');
const { setValidate } = require('../../validation/web/reset.validations');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const crypto = require('crypto');

exports.setController = async (req, res, next) => {

   try {
      const { error } = setValidate(req.body);
      if (error) return res.status(400).send(error.details[0].message);

      const {email,token,newpassword} = req.body;
      // console.log("fk12");
      //remove all expired tokens
      var currDate = new Date();

      await reset_password.destroy({
         where: {
            [Op.or]: [ { expire: { [Op.lt]: currDate } } , {used: 1} ]
         }
      });
      // console.log("fk13");
      //find the token
      var record = await reset_password.findOne({
         where: {
         email: email,
         expire: { [Op.gt]: currDate},
         token: token,
         used: 0
         }
      });
      // console.log("fk1");
      if (record == null){
         res.status(400).send("Token not found. Please try the reset password process again.");
      }
      // console.log("fk2");
      await reset_password.update({
         used: 1
       },
       {
         where: {
           email: email
         }
      });
      // console.log("fk3");
      var newSalt = crypto.randomBytes(64).toString('hex');
      var newPassword = crypto.pbkdf2Sync(newpassword, newSalt, 10000, 64, 'sha512').toString('base64');
      // console.log("fk4");
      await webuser.update({
         password: newPassword,
         salt: newSalt
      },
      {
         where: {
         email: req.body.email
         }
      });
   
      // console.log("fk5");
      return res.status(200).send('Password reset successfull. Please login with your new password.');

   } catch (e) {
      return res.status(500).json({ message: e.message })
   }
}

