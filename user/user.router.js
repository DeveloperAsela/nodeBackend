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
    console.log(req.body)
    User.findOne({ email: req.body.email }).exec().then((user) => {

        bcrypt.compare(req.body.password, user.password, function (err, result) {
            // res == true
            if (err) {
                return res.status(401).json({
                    faild: "password not match"
                })
            }
            if (result) {
                var jwtToken = jwt.sign({ email: user.email, _id: user._id }, config.tokenScret, { expiresIn: 60 * 60 })
                return res.status(200).json({
                    message: "successfully Login!",
                    status: true,
                    token: jwtToken,
                    result: user.role
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
    bcrypt.hash(req.body.password, 10, (err, hash) => {
        if (err) {
            console.log("error: " + err);
            return res.status(500).json({
                "error": err
            })
        } else {
            const user = new User({
                _id: mongoose.Types.ObjectId(),

                firstname: req.body.firstname,
                lastname: req.body.lastname,
                email: req.body.email,
                password: hash,
                mobile: req.body.mobile,
                role: req.body.role
            });
            user.save().then(
                (error, result) => {
                    console.log(err, result);
                    if (req.body.role == 2) {
                        nodemailer.createTestAccount((err, account) => {
                            var transporter = nodemailer.createTransport({
                                service: 'gmail',
                                auth: {
                                    user: 'kokzzspy@gmail.com',
                                    pass: 'Kasun56@'
                                }
                            });
        
                            // setup email data with unicode symbols
                            let mailOptions = {
                                from: '"Fred Foo 👻" aselamrt.123@gmail.com', // sender address
                                to: "kamithawede@gmail.com", // list of receivers
                                subject: 'Hello ✔', // Subject line
                                text: 'Hello world?', // plain text body
                               // html: '<b>Hello world?</b>' // html body
                            };
        
                            // send mail with defined transport object
                            transporter.sendMail(mailOptions, (error, info) => {
                                if (error) {
                                    return console.log(error);
                                }
                                console.log('Message sent: %s', info.messageId);
                                // Preview only available when sending through an Ethereal account
                                console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
        
                                // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
                                // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
                            });
                        });
                    }
                    
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
});
/**get all the users**/
router.get("/", (req, res) => {
    User.find({}).exec().then(
        (result) => {
            console.log(result)
            res.status(200).json({
                users: result
            })
        }
    ).catch();
});

router.post("/supplier/accept", (req, res) => {

    Supplier.findOne({ _id: req.body._id }, (err, doc) => {
        console.log(doc);
        console.log(err);
        const user = new User({
            _id: mongoose.Types.ObjectId(),
            email: doc.email,
            password: doc.password,
            organization: doc.organization,
            role: doc.role,
            name: doc.name

        });
        user.save().then(
            (result) => {
                console.log(result);
                Supplier.deleteOne({ _id: result._id }, (err, result) => {
                    console.log("deleted")
                }).then().catch();
                return res.status(200).json({
                    "sucess": "Supplier is added successfully to User",
                    result: result
                })
            }
        ).catch(
            error => {
                return res.status(500).json({
                    "error": error
                })
            }
        );
    });

});


module.exports = router;


