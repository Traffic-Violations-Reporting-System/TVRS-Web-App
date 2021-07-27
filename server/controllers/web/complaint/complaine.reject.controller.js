const {Reject,Complaint}=require('../../../models');

exports.rejectComplainController = async (req, res) => {
    try{

        const {description,reason,userRating,ComplaintId} = req.body;

        const complaint =await Complaint.findByPk(ComplaintId);
        if (!complaint) return res.status(400).send("Not found Complaint!");

        const reject = await Reject.create({description,reason,userRating,ComplaintId});
        if(!reject) return res.status(400).send("complaint reject failed. Try again!");
        return res.status(200).send("successfully Added!");


    }catch (e) {
        return res.status(500).send("Internal Server Error");
    }
}
