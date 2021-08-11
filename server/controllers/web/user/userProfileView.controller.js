const {WebUserRole,Police,Complain_Police,Sequelize,sequelize}=require('../../../models');

exports.UserProfileController = async (req, res) => {
    try{

        let foundUser = await Police.findOne({
            where: { id:req.params.id },
            attributes: [
                'first_name',
                'last_name',
                'email',
                'status',
                'nic',
                'service_id',
                ['createdAt','member_since'],
                [Sequelize.literal('webuserrole.role'), 'role']
            ],
            include : [{ model: WebUserRole, as: 'webuserrole', attributes: []}]

        });
        if (!foundUser) return res.status(400).send("not user fot given id");

        //SELECT   COUNT(complaineId) AS count ,`status`,`userId` FROM `complain_invoive_police`
        // WHERE userId=2
        // GROUP BY status
        let record =await Complain_Police.findAll({
            attributes: [
                'status',
                [sequelize.fn('count', sequelize.col('complaineId')), 'count']
            ],
            where: { userId:req.params.id },
            group: ['status']
        });

        return res.status(200).send({
             "user" : foundUser,
             "action" :record
        });
    }catch (e) {
        return res.status(500).send("Internal Server Error");
    }
}

