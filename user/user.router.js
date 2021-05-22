const express = require('express');
const router = express.Router();

const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const config = require('../config/config');

const User = require("./user.model");
const Supplier = require("../supplier/supplier.model");
const nodemailer = require('nodemailer');


/**user login**/
router.post("/login", (req, res) => {
    User.findOne({ nicNumber: req.body.nicNumber }).exec().then((user) => {
        console.log(user)

        bcrypt.compare(req.body.password, user.password, function (err, result) {
            // res == true
            if (err) {
                return res.status(401).json({
                    faild: "password not match"
                })
            }
            if (result) {
                var jwtToken = jwt.sign({ nicNumber: user.nicNumber, _id: user._id }, config.tokenScret, { expiresIn: 60 * 60 })
                return res.status(200).json({
                    message: "successfully Login!",
                    status: true,
                    token: jwtToken
                })
            }
            return res.status(401).json({
                error: "email not match in database"
            })
        });


    }).catch(
        (err) => {
            return res.status(500).json({
                error: err
            })
        }
    );
});

/**user register **/
router.post("/register", (req, res) => {
    User.findOne({ email: req.body.nicNumber }).exec().then((user) => {

        if (!user) {
            bcrypt.hash(req.body.password, 10, (err, hash) => {
                if (err) {
                    console.log("error: " + err);
                    return res.status(500).json({
                        "error": err
                    })
                } else {
                    const user = new User({
                        _id: mongoose.Types.ObjectId(),
                        nicNumber: req.body.nicNumber,
                        district: req.body.district,
                        city: req.body.city,
                        password: hash,
                    });
                    user.save().then(
                        (error, result) => {
                            console.log(err, result);
                            return res.status(200).json({
                                "status": true,
                                "message": "user is added successfully"
                            })
                        }
                    ).catch(
                        error => {
                            return res.status(500).json({
                                "error": error
                            })
                        }
                    );
                }
            })  
        } else {
            return res.status(200).json({
                status: true,
                message: 'Nic Number Alreay used.'
            }) 
        }
       


    }).catch(
        (err) => {
            return res.status(500).json({
                error: err
            })
        }
    );
   
});

module.exports = router;


