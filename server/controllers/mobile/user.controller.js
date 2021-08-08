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


function sendOTP(req, res)  {
    models.mobile_user.findOne({where:{nic: req.body.nic}}).then(user => {
        if(user===null){
            res.status(401).json({
                message: "This user doesnt exist!",
            });
        }
        else{
            models.mobile_user.update({ mphone: req.body.mphone }, {
                where: {
                    id: user.id
                }
            }).then(result => {
                //generate otp
                var otp = otpGenerator.generate(6, { alphabets: false, upperCase: false, specialChars: false });

                const data = {
                    otp: otp,
                    user_id: user.id
                }

                models.mobile_user_otp.create(data).then(result => {

                    axios.post('https://smsapi.bitshifttech.com/api/v1/send/single', {
                        "message": otp.toString() + " is your otp code from eTrafficComplainer. Use this code to verify your mobile number.",
                        "phoneNumber": req.body.mphone
                    }, {headers: {
                            "Authorization": process.env.SMS_API_TOKEN
                        }})
                        .then(function (response) {
                            console.log(response);
                            res.status(200).json({
                                message: "otp sent"
                            });
                        })
                        .catch(function (error) {
                            res.status(500).json({
                                message: "Otp send error!",
                                error: error
                            });
                            console.log(error);
                        });

                }).catch(error => {
                    res.status(500).json({
                        message: "database error",
                        error: error
                    });
                });


            }).catch(error => {
                res.status(500).json({
                    message: "database error!",
                    error: error
                });
            });




        }
    }).catch(error => {
        res.status(500).json({
            message: "Something went wrong!",
        });
    });
}


function resendOTP(req, res)  {
    models.mobile_user.findOne({where:{nic: req.body.nic}}).then(user => {
        if(user===null){
            res.status(401).json({
                message: "This user doesnt exist!",
            });
        }else{

            //generate otp
            var otp = otpGenerator.generate(6, { alphabets: false, upperCase: false, specialChars: false });


            models.mobile_user_otp.update({otp: otp}, {
                where: {
                    user_id: user.id
                }
            }).then(result => {

                axios.post('https://smsapi.bitshifttech.com/api/v1/send/single', {
                    "message": otp.toString() + " is your otp code from eTrafficComplainer. Use this code to verify your mobile number.",
                    "phoneNumber": user.mphone
                }, {headers: {
                        "Authorization": process.env.SMS_API_TOKEN
                    }})
                    .then(function (response) {
                        console.log(response);
                        res.status(200).json({
                            message: "otp sent"
                        });
                    })
                    .catch(function (error) {
                        res.status(500).json({
                            message: "Otp send error!",
                            error: error
                        });
                        console.log(error);
                    });

            }).catch(error => {
                res.status(500).json({
                    message: "database error",
                    error: error
                });
            });

        }
    }).catch(error => {
        res.status(500).json({
            message: "Something went wrong!",
        });
    });
}


function verifyOTP(req, res)  {
    models.mobile_user.findOne({where:{nic: req.body.nic}}).then(user => {
        if(user===null){
            res.status(401).json({
                message: "This user doesnt exist!",
            });
        }
        else{
            models.mobile_user_otp.findOne({where:{user_id: user.id}}).then(data => {
                var today = +new Date;
                var otptime = new Date(data.updatedAt);
                if(today-otptime < 1000 * 60 * 3){
                    if(data.otp === req.body.otp){
                        res.status(200).json({
                            message: "verification successful",

                        });
                    }else{
                        res.status(400).json({
                            message: "verification failed",
                        });
                    }
                }else{
                    res.status(405).json({
                        message: "otp expired!",
                    });
                }

            }).catch(error => {
                res.status(500).json({
                    message: "database error",
                    error: error
                });
            });
        }
    }).catch(error => {
        res.status(500).json({
            message: "Something went wrong!",
        });
    });
}

function forgotPasswordSendOTP(req, res){
    models.mobile_user.findOne({where:{mphone:req.body.mphone}}).then(user => {

        if(user==null){
            res.status(401).json({
                message: "This user doesnt exist!",
            });
        }
        else{

            //generate otp
            var otp = otpGenerator.generate(6, { alphabets: false, upperCase: false, specialChars: false });


            models.mobile_user_otp.update({otp: otp}, {
                where: {
                    user_id: user.id
                }
            }).then(result => {

                axios.post('https://smsapi.bitshifttech.com/api/v1/send/single', {
                    "message": otp.toString() + " is your otp code from eTrafficComplainer. Use this code to verify your mobile number.",
                    "phoneNumber": user.mphone
                }, {headers: {
                        "Authorization": process.env.SMS_API_TOKEN
                    }})
                    .then(function (response) {
                        console.log(response);
                        res.status(200).json({
                            message: "otp sent"
                        });
                    })
                    .catch(function (error) {
                        res.status(500).json({
                            message: "Otp send error!",
                            error: error
                        });
                        console.log(error);
                    });

            }).catch(error => {
                res.status(500).json({
                    message: "database error",
                    error: error
                });
            });
        }
    } ).catch(error => {
        res.status(500).json({
            message: "Something went wrong",
            error: error
        });
    })

}

function resendforgotPasswordOTP(req, res)  {
    models.mobile_user.findOne({where:{mphone:req.body.mphone}}).then(user => {
        if(user===null){
            res.status(401).json({
                message: "This user doesnt exist!",
            });
        }else{

            //generate otp
            var otp = otpGenerator.generate(6, { alphabets: false, upperCase: false, specialChars: false });


            models.mobile_user_otp.update({otp: otp}, {
                where: {
                    user_id: user.id
                }
            }).then(result => {

                axios.post('https://smsapi.bitshifttech.com/api/v1/send/single', {
                    "message": otp.toString() + " is your otp code from eTrafficComplainer. Use this code to verify your mobile number.",
                    "phoneNumber": user.mphone
                }, {headers: {
                        "Authorization": process.env.SMS_API_TOKEN
                    }})
                    .then(function (response) {
                        console.log(response);
                        res.status(200).json({
                            message: "otp sent"
                        });
                    })
                    .catch(function (error) {
                        res.status(500).json({
                            message: "Otp send error!",
                            error: error
                        });
                        console.log(error);
                    });

            }).catch(error => {
                res.status(500).json({
                    message: "database error",
                    error: error
                });
            });

        }
    }).catch(error => {
        res.status(500).json({
            message: "Something went wrong!",
        });
    });
}

function verifyForgotPasswordOTP(req, res)  {
    models.mobile_user.findOne({where:{mphone: req.body.mphone}}).then(user => {
        if(user===null){
            res.status(401).json({
                message: "This user doesnt exist!",
            });
        }
        else{
            models.mobile_user_otp.findOne({where:{user_id: user.id}}).then(data => {
                var today = +new Date;
                var otptime = new Date(data.updatedAt);
                if(today-otptime < 1000 * 60 * 3){
                    if(data.otp === req.body.otp){
                        res.status(200).json({
                            message: "verification successful",

                        });
                    }else{
                        res.status(400).json({
                            message: "verification failed",
                        });
                    }
                }else{
                    res.status(405).json({
                        message: "otp expired!",
                    });
                }

            }).catch(error => {
                res.status(500).json({
                    message: "database error",
                    error: error
                });
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
    verifyOTP: verifyOTP,
    sendOTP: sendOTP,
    resendOTP: resendOTP,
    forgotPasswordSendOTP: forgotPasswordSendOTP,
    resendforgotPasswordOTP: resendforgotPasswordOTP,
    verifyForgotPasswordOTP: verifyForgotPasswordOTP
}


