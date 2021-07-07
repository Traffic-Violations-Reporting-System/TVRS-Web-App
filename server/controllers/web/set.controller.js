const { webuser, reset_password } = require('../../models');
const { setValidate } = require('../../validation/web/reset.validations');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const crypto = require('crypto');

exports.setController = async (req, res) => {

   try {
      const { error } = setValidate(req.body);
      if (error) return res.status(400).send(error.details[0].message);

      //remove all expired tokens
      await reset_password.destroy({
         where: {
            [Op.or]: [ { expire: { [Op.lt]: Sequelize.fn('CURDATE') } } , {used: 0} ]
         }
      });
      
      //find the token
      var record = await reset_password.findOne({
         where: {
         email: req.query.email,
         expiration: { [Op.gt]: Sequelize.fn('CURDATE')},
         token: req.query.token,
         used: 0
         }
      });

      if (record == null){
         res.status(400).send("Token not found. Please try the reset password process again.");
      }

      await reset_password.update({
         used: 1
       },
       {
         where: {
           email: req.body.email
         }
      });

      var newSalt = crypto.randomBytes(64).toString('hex');
      var newPassword = crypto.pbkdf2Sync(req.body.password1, newSalt, 10000, 64, 'sha512').toString('base64');
   
    await webuser.update({
      password: newPassword,
      salt: newSalt
    },
    {
      where: {
        email: req.body.email
      }
    });
   

    return res.status(200).send('Password reset successfull. Please login with your new password.');

   } catch (error) {
      return res.status(500).send("Internal Server Error")
   }
}