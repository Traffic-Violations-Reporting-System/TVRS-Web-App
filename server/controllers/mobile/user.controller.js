const models  = require('../../models');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');

function register(req, res){

    models.mobile_user.findOne({wher:{email:req.body.email}}).then(result => {
        if(result){
            res.status(409).json({
                message: "This email is already registered!",
            });
        }
        else
        {
            bcryptjs.genSalt(10, function(err, salt){
                bcryptjs.hash(req.body.password, salt, function(err, hash){
                    const users = {
                        full_name: req.body.fullname,
                        email: req.body.email,	
                        nic: req.body.nic,
                        address: req.body.address,	
                        password: hash
                        
                    }
                
                
                    models.mobile_user.create(users).then(result => {
                        res.status(201).json({
                            message: "registration successfull",
                            users: result
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

function login(req, res){
    models.mobile_user.findOne({where:{email: req.body.email}}).then(user => {
        if(user===null){
            res.status(401).json({
                message: "Dont have an account? please register!",
            });
        }
        else{
            bcryptjs.compare(req.body.password, user.password, function(err, result){
                if(result){
                    const token = jwt.sign({
                        email: user.email,
                        userId: user.id
                    }, 'secret', function(err, token){
                        res.status(500).json({
                            message: "Authentication successful!",
                            token: token
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

// function sendOtp(req, res){

// }

// function verifyOtp(req, res){

// }

module.exports = {
    register: register,
    login: login
}