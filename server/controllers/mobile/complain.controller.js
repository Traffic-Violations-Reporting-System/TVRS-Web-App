const models = require('../../models');

function createComplain(req,res){

    models.mobile_user_session.findOne({where:{token:req.body.token}}).then(user => {
        if(user==null){
            res.status(401).json({
                message: "This user doesnt exist!",
            });
        }
        else{
            const complaint = {
                description: req.body.description,
                location: req.body.location,
                user_id: user.user_id

            }
            models.complaint.create(complaint).then(result => {
                if(result==null){
                    res.status(401).json({
                        message: "something went wrong",
                    });
                }
                models.complaint.findOne({where:{user_id: user.user_id}}).then(data => {
                    if(data==null){
                        res.status(401).json({
                            message: "This user doesnt exist!",
                        });
                    }
                    else{
                        const videoRef = {
                            reference: req.body.videoReference,
                            complaint_id: data.id
                        }
                        models.video_ref.create(videoRef).then(result => {
                            if(result==null){
                                res.status(401).json({
                                    message: "something went wrong",
                                });
                            }
                            const imageRef = {
                                reference: req.body.imgReference,
                                complain_id: data.id
                            }
                            models.image_ref.create(imageRef).then(result => {
                                    res.status(200).json({
                                        message: "complaint added successfully",
                                        // users: result
                                    });
                                }).catch(error => {
                                    res.status(500).json({
                                        message: "Something went wrong 2!",
                                        error: error
                                    });

                            });
                        }).catch(error => {
                            res.status(500).json({
                                message: "Something went wrong 2!",
                                error: error
                            });
                        });

                    }

                }).catch(error => {
                    res.status(500).json({
                        message: "Something went wrong 3!",
                        error: error
                    });
                });
            });

            }}).catch(error => {
                res.status(500).json({
                message: "Something went wrong 4!",
                error: error
        });
    });

}


async function viewMyComplaints(req, res) {
    models.complaint.belongsTo(models.mobile_user, {foreignKey: 'user_id'});
    models.mobile_user.hasMany(models.complaint, {foreignKey: 'user_id'});

    models.mobile_user_session.belongsTo(models.mobile_user, {foreignKey: 'user_id'});
    models.mobile_user.hasMany(models.mobile_user_session, {foreignKey: 'user_id'});

    models.mobile_user_session.findAll({
        attributes: [],
        include: [{
            model: models.mobile_user,
            attributes: ['full_name'],
            required: true,
            include: [{
                model: models.complaint,
                attributes: ['description', 'location'],
                required: true,
            }],
        }],
        where: {
            token : req.body.token
        }
    }).then(result=>{
        res.status(200).json({
            message: "done",
            result: result

        });

    })

}

module.exports = {
    createComplain: createComplain,
    viewMyComplaints: viewMyComplaints
}