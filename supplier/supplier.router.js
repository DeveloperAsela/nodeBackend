const express = require('express');
const router = express.Router();


const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
// const config = require('../config/config');
// const jwt = require('jsonwebtoken');

const Supplier = require("./supplier.model");
const User = require("../user/user.model");


/**supplier register **/
router.post("/register", (req, res) => {
    console.log(req.body)
    bcrypt.hash(req.body.password, 10, (err, hash) => {
        if (err) {
            console.log("error: " + err);
            return res.status(500).json({
                "error": err
            })
        } else {
            const supplier = new Supplier({
                _id: mongoose.Types.ObjectId(),
                email: req.body.email,
                password: hash,
                organization: req.body.organization,
                role: req.body.role,
                name: req.body.name
            });
            supplier.save().then(
                (result) => {
                    console.log(result);
                    return res.status(200).json({
                        "sucess": "supplier is added successfully"
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
/**get all the supplier's register request**/
router.get("/", (req, res) => {
    Supplier.find({}).exec().then(
        (result) => {
            res.status(200).json({
                suppliers: result
            })
        }
    ).catch();
});
/**delet one supplier's register request**/
router.delete("/reject", (req, res) => {
    Supplier.deleteOne({ _id: req.body._id }, (err) => {
        console.log(err, "database error")
    }).exec().then((result) => {
        console.log(result);
        return res.status(200).json({
            "sucess": "supplier is deleted successfully"
        })
    }
    ).catch((error) => {
        return res.status(500).json({
            error: error,
            message: "cant find any spplier match with id"
        })
    });
});

module.exports = router;



