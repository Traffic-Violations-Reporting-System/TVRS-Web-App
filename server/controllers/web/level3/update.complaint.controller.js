const { Complaint, Accept, Person, Vehicle } = require('../../../models');
const complaintValidation = require('../../../validation/web/level3/update.complaint.validations');


exports.updateComplaintController = async (req, res) => {
    try{
        const { complaintId, otherDetails, peopleList, vehicleList } = req.body;
        
        const Com_Id = await Accept.findOne({   //id of the complaints table's related row
            attributes: ['ComplaintId'],   
            where: { id: complaintId }
        });

        if (!Com_Id) return res.status(400).send("Complaint Not found!");

        const update_progress = await Accept.update({ progress: otherDetails.progress }, {
            where: {
                id: complaintId
            } 
        });
        otherDetails.status == "accepted" ?
            otherDetails.status = "ongoing" : otherDetails.status = otherDetails.status;

        const update_status = await Complaint.update(
            {
            complaint_status: otherDetails.status
            },
            {
                where: {
                    id: Com_Id[0].ComplaintId
                }
            }
        );

        const update_people = await Person.bulkCreate( peopleList, {
            updateOnDuplicate:
                ["nic", "contactNo", "ageRange", "gender", "skinColor", "personStatus"]
        })
        
        const update_vehicle = await Vehicle.bulkCreate( vehicleList, {
            updateOnDuplicate:
                ["vehicleNumber","ownerNic","vehicleType","vehicleColor","vehicleStatus"]
        });

        return res.status(200).send("Update Successfull!");

    } catch (e) {
        return res.status(500).send(e);
    }
}
