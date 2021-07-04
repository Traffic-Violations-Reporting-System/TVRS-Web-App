const {sequelize,webuser,webuserrole}=require('../../../models');
const userValidation=require('../../../validation/web/user/user.validation');
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");

exports.registerController = async (req, res) => {
    try{
        const {error} = userValidation(req.body);
        if (error) return res.status(400).send(error.details[0].message);

        const {first_name,last_name,email,role_id,nic,service_id}=req.body;
        let user =await webuser.findOne({where:{email}})
        if(user) return res.status(400).send('User already registered!');

        const selected_role = await webuserrole.findOne({where:{id:role_id}});
        if (!selected_role) return res.status(400).send("Invalid Role.");


        user = {
            first_name,
            last_name,
            email,
            role_id,
            status: 0,
            nic,
            service_id,
        };

         await webuser.create(user);
        return res.status(200).send("user successfully registerd");
    }catch (e) {
        return res.status(500).send("Internal Server Error");
    }
}
