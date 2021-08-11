

const {sequelize,Police,WebUserRole,Sequelize}=require('../../../models');
const userValidation=require('../../../validation/web/user/user.validation');


exports.ViewController = async (req, res) => {
    try{

        let user =await Police.findAll({

            attributes: [
                'id',
                'first_name',
                'last_name',
                ['service_id','serviceId'],
                'email',
                'status',
                [Sequelize.literal('webuserrole.role'), 'role']


            ],

            include : [{ model: WebUserRole, as: 'webuserrole', attributes: []}]

        });
        return res.status(200).send(user);

    }catch (e) {
        return res.status(500).send("Internal Server Error");
    }
}

