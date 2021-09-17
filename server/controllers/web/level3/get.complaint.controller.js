const { Complaint, Accept, mobile_user, Person, Vehicle } = require('../../../models');

mobile_user.hasMany(Complaint, { foreignKey: 'mobile_user_id', sourceKey: 'id' });
Complaint.belongsTo(mobile_user, { foreignKey: 'mobile_user_id', targetKey: 'id' });

Complaint.hasOne(Accept, { foreignKey: 'ComplaintId' });
Accept.belongsTo(Complaint);

Accept.hasMany(Person, { foreignKey: 'acceptId' });
Person.belongsTo(Accept);

Accept.hasMany(Vehicle, { foreignKey: 'acceptId' });
Vehicle.belongsTo(Accept);

exports.getComplaintController = async (req, res) => {

   try {
     
      const basics = await Accept.findOne({
        attributes: [
          'description',
          'violationType',
          'progress'
        ],
        include: [{
          model: Complaint,
          attributes: [
            'description',
            'complaint_status'
          ],
          required: true,
          include: [{
            model: mobile_user,
            attributes: [
              'full_name',
              'nic',
              'mphone'
            ],
            required: true
          }],
        }],
        where: { id: req.params.id }
      });
       
      if (!basics) return res.status(400).send("Not found descriptions!");
      
      // const mobileUser = await mobile_user.findOne({
      //   attributes: [
      //     'full_name',
      //     'nic',
      //     'mphone'
      //   ],
      //   include: [{
      //     model: Complaint,
      //     attributes: [
      //       'description',
      //       'complaint_status'
      //     ],
      //     required: true,
      //   }]
        
      // })
     
      const peopleList = await Person.findAll({
          attributes: [
            'id',
            'ageRange',
            'gender',
            'personStatus',
            'skinColor',
            'nic',
            'contactNo',
            'acceptId'
        ],
        where: { acceptId: req.params.id }
      });
     
      if (!peopleList) return res.status(400).send("Not found people!");
          
      const vehicleList = await Vehicle.findAll({
          attributes: [
            'id',
            'vehicleColor',
            'vehicleNumber',
            'vehicleStatus',
            'vehicleType',
            'ownerNic',
            'acceptId'
        ],
        where: { acceptId: req.params.id }
      });
      if (!vehicleList) return res.status(400).send("Not found vehicle!");
       
       let result = [];
       //acceptArr.push({"status":"on Going"});
       result.push({ "userDescription": basics.Complaint.description });
       result.push({ "status": basics.Complaint.complaint_status });
       result.push({ "officerDescription": basics.description });
       result.push({ "violationType": basics.violationType });
       result.push({ "progress": basics.progress });
       result.push({ "peopleList": peopleList });
       result.push({ "vehicleList": vehicleList });
       result.push({ "mobileUser": basics.Complaint.mobile_user})
      //  console.log(result[7].complaintId)
       return res.status(200).send(result)
    
    }catch (e) {
      return res.status(500).send(e);
    }
}
                                           