const {Complaint}=require('../../../models');

const {fn,col} = require('sequelize');
exports.findNewAllComplainController = async (req, res) => {
    try{
        const allComplaint =await Complaint.findAll({

            where: { status: 'No Action' },


            attributes: [
                'id',
                'location',
                'status',
                [fn('DATE', col('createdAt')), 'date']
            ]
        });
        if (!allComplaint) return res.status(400).send("Not found Complaint!");

        return res.status(200).send(allComplaint);

    }catch (e) {
        return res.status(500).send("Internal Server Error");
    }
}
