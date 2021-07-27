const {Review,Complaint}=require('../../../models');

exports.reviewComplainController = async (req, res) => {
    try{
        const {description,ComplaintId} = req.body;

        const complaint =await Complaint.findByPk({description,ComplaintId});
        if (!complaint) return res.status(400).send("Not found Complaint!");

        const review = await Review.create({description,ComplaintId});
        if(!review) return res.status(400).send("complaint review Add failed. Try again!");
        return res.status(200).send("successfully Added!");

    }catch (e) {
        return res.status(500).send("Internal Server Error");
    }
}
