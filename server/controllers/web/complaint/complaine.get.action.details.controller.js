const {Complaint,Complain_Police,Accept,Review,Person,Vehicle,Police}=require('../../../models');
const {fn,col} = require('sequelize');

exports.getComplainActionDetailsController = async (req, res) => {
    try{
        const complainId = req.params.id;

        const isAvailable =await Complaint.findOne({
            where: {
                id: complainId,
            },
        });
        if(!isAvailable) return res.status(401).send("Access denidated");

        let policeComplaint =await Complaint.findAll({
            where: {
                       id: complainId,
                       status: ['accept','review']
            },
            include: [{
                model: Police,
                where: {
                    id:'2'
                },
                required: true
            }]
        });
        const type =policeComplaint[0].status ==="accept"? "accept":"review";


        if(type === "accept"){
            var acceptArr =await Accept.findAll({
                where: {
                    ComplaintId: complainId,
                },
                attributes: ['policeRegion', 'violationType', 'ComplaintAccuracy', 'description','updatedAt'],
                include: [{
                    model: Person,
                    required: true,
                    attributes: ['id', 'ageRange', 'gender', 'personStatus','skinColor'],

                }, {
                    model: Vehicle,
                    required: true,
                    attributes: ['id', 'vehicleColor', 'vehicleNumber', 'vehicleStatus','vehicleType']
                }],

            });
            acceptArr.push({"updateDate":acceptArr[0].updatedAt.toISOString().slice(0, 10)});
            acceptArr.push({"status":"on Going"});
            return res.status(200).send(acceptArr);
        }


    }catch (e) {
        return res.status(500).send("Internal Server Error");
    }
}
