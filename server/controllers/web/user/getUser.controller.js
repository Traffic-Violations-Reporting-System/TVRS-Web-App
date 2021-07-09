const {sequelize,webuser}=require('../../../models');

exports.getSelectedUserController = async (req, res) => {
    try{

        const foundUser = await webuser.findOne({ where: { id:req.params.id } });
        if (!foundUser) return res.status(400).send("not user fot given id");

        return res.status(200).send({
            'first_name':foundUser.first_name,
            'last_name':foundUser.last_name,
            'email':foundUser.email,
            'role':foundUser.role_id,

        });
    }catch (e) {
        return res.status(500).send("Internal Server Error");
    }
}

