const {Complaint}=require('../../../models');
const {fn,col} = require('sequelize');
exports.getComplainController = async (req, res) => {
    try{
        const {ComplaintId} = req.body;

        const complaint =await Complaint.findByPk(ComplaintId);
        if (!complaint) return res.status(400).send("Not found Complaint!");

        return res.status(200).send({

            description:complaint.description,
            location: complaint.location,
            status: complaint.status,
            date:complaint.createdAt.toISOString().slice(0, 10),
            time:complaint.createdAt.toISOString().slice(11, 16)
        });

    }catch (e) {
        return res.status(500).send("Internal Server Error");
    }
}
