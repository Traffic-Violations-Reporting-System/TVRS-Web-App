const {Complaint}=require('../../../models');
const {fn,col,Op } = require('sequelize');


exports.getComplainController = async (req, res) => {
    try{
        const {currentUserId} =req.body;
        // const complaint =await Complaint.findByPk(req.params.id);
        // if (!complaint) return res.status(400).send("Not found Complaint!");
        const complaint =await Complaint.findOne({
            where: {
                [Op.and]: [
                    { id: req.params.id },
                    { status: 'pending' },
                    {take:false}
                ]
            }
        });
        if (!complaint) return res.status(400).send("Not found Complaint!");
        const updatedComplaint = await Complaint.update({ take: true,user_id:currentUserId }, {
            where: {
                [Op.and]: [
                    { id: req.params.id },
                    { status: 'pending' },
                    {take:false}
                ]
            }
        });
        if (!updatedComplaint) return res.status(400).send("Complaint take status update failed");

        return res.status(200).send({
            description:complaint.description,
            location: complaint.location,
            status: complaint.status,
            date:complaint.createdAt.toISOString().slice(0, 10),
            time:complaint.createdAt.toISOString().slice(11, 16)
        });

    }catch (e) {
        return res.status(500).send("Internal Server Error",e);
    }
}

