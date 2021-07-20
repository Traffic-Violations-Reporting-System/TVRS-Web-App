
const {webuser,webuserrole,reset_password}=require('../../../models');
const userValidation=require('../../../validation/web/user/user.validation');
const crypto  = require('crypto');

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

        const successUser = await webuser.create(user);
        if(!successUser) return res.status(404).send("User not registered");

        const token = crypto.randomBytes(64).toString('base64');

        let expireDate = new Date();
        expireDate.setDate(expireDate.getDate() + 1);

        const tokenData={
            user_id:successUser.id,
            email:email,
            auth_token:token,
            used: 1,
            expire:expireDate
        }
        const successToken = await reset_password.create(tokenData);
        if(!successToken) return res.status(404).send("token recode not added to the database!");


        return res.status(200).send("User was registered successfully!");
    }catch (e) {
        return res.status(500).send("Internal Server Error");
    }
}

