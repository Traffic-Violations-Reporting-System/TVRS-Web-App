const {sequelize,webuser,webuserrole}=require('../../models');
const authValidation=require('../../validation/web/auth.validation');
const Joi = require("joi");
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");

exports.loginController = async (req, res) => {
    try{
        const {error} = authValidation(req.body);
        if (error) return res.status(400).send(error.details[0].message);
        const {email,password}=req.body;
        const user =await webuser.findOne({where:{email}})

        if (!user) return res.status(400).send("invalid username or password");

        if(!user.status) return res.status(400).send("user is not active");

        const validPassword =await bcrypt.compare(password,user.password);
        if(!validPassword)  return res.status(400).send("invalid username or password");
        const role =await webuserrole.findOne({where:{id:user.role_id}});
        const token = jwt.sign({userId:user.id,first_name:user.first_name,email:user.email,role:role.role},'jwtPrivateKey');
        return res.status(200).send(token);

    }catch (e) {
        return res.status(500).send("Internal Server Error")
    }
}

exports.currentUserController =async (req,res) =>{
    const user = await webuser.findByPk(req.user.userId);
    res.send(user);
}