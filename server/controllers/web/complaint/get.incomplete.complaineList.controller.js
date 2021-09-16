const {Complaint}=require('../../../models');

const {fn,col,Op} = require('sequelize');
exports.findAllIncompleteComplainController = async (req, res) => {
    try{
        const {currentUserId} =req.body;
        const allComplaint =await Complaint.findAll({

            where: {
                [Op.and]: [
                    { status: 'pending' },
                    {take:true},
                    {user_id:currentUserId}
                ]
            },


            attributes: [
                'id',
                'description',
                'location',
                'status',
                [fn('DATE', col('createdAt')), 'date']
            ]
        });
        if (!allComplaint) return res.status(400).send("Not found Any Incomplete Complaint!");

        return res.status(200).send(allComplaint);

    }catch (e) {
        return res.status(500).send("Internal Server Error");
    }
}
