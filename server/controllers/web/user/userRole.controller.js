const {sequelize,webuserrole}=require('../../../models');const userRoleValidation=require('../../../validation/web/user/userRole.validation');

exports.userRoleController = async (req, res) => {
    try{

       const result = await webuserrole.findAll({attributes: ['id','role']});
       if(!result) return res.status(400).send("no role found!");
        return res.status(200).send(result);
    }catch (e) {
        return res.status(500).send("Internal Server Error");
    }
}
exports.userRoleAddController = async (req, res) => {
    try{

        const {role}=req.body;
        
        const {error} = userRoleValidation(req.body);
        if (error) return res.status(400).send(error.details[0].message);
        
        let userrole =await webuserrole.findOne({where:{role}})
        if(userrole) return res.status(400).send('User Role already added!');


         const result = await webuserrole.create({role});
         if(!result) return res.status(400).send("User Role Not added!!");
         return res.status(200).send(result);
    }catch (e) {
        return res.status(500).send("Internal Server Error");
    }
}

