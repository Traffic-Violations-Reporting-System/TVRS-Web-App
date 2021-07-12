

const {sequelize,webuser,webuserrole}=require('../../../models');
const userValidation=require('../../../validation/web/user/user.validation');
const crypto  = require('crypto');

exports.ViewController = async (req, res) => {
    try{

        let user =await webuser.findAll({

            attributes: [
                'id',
                // [sequelize.fn('concat', sequelize.col('first_name'), ' ', sequelize.col('last_name')), "fullname"],
                'first_name',
                'last_name',
                'service_id',
                'email',
                'status',
                ['nic','role'],


            ],

            include : [{ model:  webuserrole, attributes: ["role"]}]

        });

        for(let i = 0; i < user.length; i++){
            let obj =user[i];

            user[i]={
                   'id' : obj.id,
                  'name' : obj.first_name+''+obj.last_name,
                  'serviceId' : obj.service_id,
                  'email': obj.email,
                  'role' : obj.webuserrole.role,
                 'status' : obj.status,
             };
        }

        return res.status(200).send(user);
    }catch (e) {
        return res.status(500).send("Internal Server Error");
    }
}

