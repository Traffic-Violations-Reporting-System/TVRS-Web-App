const {sequelize,webuserrole}=require('../../../models');

exports.userRoleController = async (req, res) => {
    try{

       const result = await webuserrole.findAll({attributes: ['role']});
       if(!result) return res.status(400).send("no role found!");
        return res.status(200).send(result);
    }catch (e) {
        return res.status(500).send("Internal Server Error");
    }
}
