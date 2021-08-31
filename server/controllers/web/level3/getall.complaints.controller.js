const Op = require('sequelize').Op;
const { Accept, Complaint } = require('../../../models');
Accept.hasOne(Complaint, { foreignKey: 'ComplaintId' });
Complaint.belongsTo(Accept, { foreignKey: 'ComplaintId', targetKey: 'id' });

exports.getallComplaintsController = async (req, res) => {

   Complaint.hasOne(Accept, { foreignKey: 'ComplaintId' });
   Accept.belongsTo(Complaint);

   const userRegion = req.params.region;

   try {
     
      const allComplaints = await Accept.findAll({
         attributes: [
            'id',
            'violationType',
            'createdAt',
            'ComplaintAccuracy'
        ],
         include: [{
            model: Complaint,
            attributes: [
               'status',
            ],
            where: {
               [Op.or]: [  { status: 'ongoing' },
                           {status: 'completed'}
               ]
            },
            required: true
         }],
         where: { policeRegion: userRegion }
      });
       
      if (!allComplaints) return res.status(400).send("Not found Complaint!");

      return res.status(200).send(allComplaints);
   
   } catch (e) {
      console.log(e)
      return res.status(500).send(e);
    }
}
