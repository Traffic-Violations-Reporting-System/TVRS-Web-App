const {Complaint,Complain_Police,Accept,Review,Person,Vehicle,Police}=require('../../../models');
const {fn,col} = require('sequelize');

exports.getComplainActionDetailsController = async (req, res) => {
    try{
        const complainId = req.params.id;

        const isAvailable =await Complain_Police.findOne({
            where: {
                complaineId: complainId,
            },
        });

        if(!isAvailable) return res.status(401).send("not access");

        let policeComplaint =await Complaint.findAll({
            where: {
                       id: complainId,
                       status: ['accept','review','complete']
            },
            include: [{
                model: Police,
                where: {
                    id:'2'
                },
                required: true
            }]
        });
        const type =isAvailable.status ==="accept"? "accept":"review";


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
        }else{

            return res.status(200).send([{"status":"Reject"}]);
        }


    }catch (e) {
        return res.status(500).send("Internal Server Error");
    }
}
