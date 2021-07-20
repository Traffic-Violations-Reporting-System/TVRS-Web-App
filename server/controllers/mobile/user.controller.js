const models  = require('../../models');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
var otpGenerator = require('otp-generator');
const axios = require('axios');


function register(req, res){

    models.mobile_user.findOne({where:{nic:req.body.nic}}).then(result => {
        if(result){
            res.status(409).json({
                message: "This nic is already registered!",
            });
        }
        else
        {
            bcryptjs.genSalt(10, function(err, salt){
                bcryptjs.hash(req.body.password, salt, function(err, hash){
                    const users = {
                        full_name: req.body.fullname,
                        nic: req.body.nic,
                        region_id: req.body.regionid,
                        password: hash
                        
                    }
                
                
                    models.mobile_user.create(users).then(result => {
                        res.status(200).json({
                            message: "registration successfull",
                            // users: result
                        });
                    }).catch(error => {
                        res.status(500).json({
                            message: "Something went wrong!",
                            error: error
                        });
                    });
                });
            });
        }
    }).catch(error => {
        res.status(500).json({
            message: "Something went wrong!",
            error: error
        });
    });

}

 function login(req, res)  {
    models.mobile_user.findOne({where:{nic: req.body.nic}}).then(user => {
        if(user===null){
            res.status(401).json({
                message: "This user doesnt exist!",
            });
        }
        else{
            bcryptjs.compare(req.body.password, user.password, function(err, result){

                
                if(result){

                    jwt.sign({
                        nic: user.nic,
                        userId: user.id,
                    },'secret', async function(err, token){

                        await models.mobile_user_session.update({ token: '123' }, {
                            where: {
                              id: user.id
                            }
                          });

                        updateOrCreate(models.mobile_user_session, {id: user.id}, { token: token, user_id: user.id })
                            .then(function(result) {
                                // result.item;  // the model
                                // result.created; // bool, if a new item was created.

                                res.status(200).json({
                                    message: "Authentication successful!",
                                    token: token
                                });
                            }).catch(function(err){
                                res.status(500).json({
                                    message: "something went wrong!",
                                });
                        });



                    });

                }else{
                    res.status(401).json({
                        message: "Invalid credentials!",
                    });
                }
            });
        }
    }).catch(error => {
        res.status(500).json({
            message: "Something went wrong!",
        });
    });
}

function updateOrCreate (model, where, newItem) {
    // First try to find the record
    return model
        .findOne({where: where})
        .then(function (foundItem) {
            if (!foundItem) {
                // Item not found, create a new one
                return model
                    .create(newItem)
                    .then(function (item) { return  {item: item, created: true}; })
            }
            // Found an item, update it
            return model
                .update(newItem, {where: where})
                .then(function (item) { return {item: item, created: false} }) ;
        });
}

module.exports = {
    register: register,
    login: login,

}


