const {sequelize,webuser,webuserrole}=require('../../../models');
const userValidation=require('../../../validation/web/user/userEdit.validation');


exports.EditController = async (req, res) => {
    try{

        const {error} = userValidation(req.body);
        if (error) return res.status(400).send(error.details[0].message);

        const {first_name,last_name, email,role_id } = req.body;

        const foundUser = await webuser.findOne({ where: { id:req.params.id } });
        if (!foundUser) return res.status(400).send("not user for given id");

        const foundRole = await webuserrole.findOne({ where: { id:role_id } });
        if (!foundRole) return res.status(400).send("not found role for selected role");


        webuser.update(
            { first_name: first_name, last_name: last_name,email:email,role_id:role_id },
            { where: { id: req.params.id } }
        );

        return res.status(200).send("user successfully updated!");
    }catch (e) {
        return res.status(500).send("Internal Server Error");
    }
}

