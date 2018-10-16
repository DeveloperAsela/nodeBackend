const express = require('express');
const router = express.Router();

const url = require('url');

const mongoose = require('mongoose');
const Area = require('../area/area.model');

const Stage = require('./project.model');

router.post("",(req, res)=>{

    areaList = ["oss", "vas", "civil", "ran", "cs core", "ps core", "transmisson", "power"];
    const areas = [];

    areaList.forEach(element => {
        const area = new Area({
            _id: mongoose.Types.ObjectId(),
            areaName: element,
            behaviour: {
                implement: false,
                supply: false
            }
        }); 
        areas.push(area);
    });
    const stage = new Stage({
        _id: mongoose.Types.ObjectId(),
       stageName : req.body.stageName,
       areas : areas
    })

    stage.save().then((err, result)=>{
        return res.status(200).json({
            "sucess": "project is added successfully",
            result : result
        })
    }).catch()

});

router.get("", (req, res) => {
    Stage.find({}).exec().then(
        (result) => {
            if (result) {
                res.status(200).json({
                    stage: result
                });
            } else {
                res.status(200).json({
                    stages: "no result there"
                })
            }

        }
    ).catch(
        (error) => {
            res.status(500).json({
                error: error,
                message: "somthing goes to wrong in db.."
            })
        }
        );
});
router.delete("/:id", (req, res) => {
    var query = url.parse(req.url, true).query;
    Stage.deleteOne({ _id: req.params.id }, (err) => {
        console.log(err, "database error")
    }).exec().then((result) => {
        console.log(result);
        return res.status(200).json({
            "sucess": "stage is deleted successfully"
        })
    }
        ).catch((error) => {
            return res.status(500).json({
                error: error,
                message: "cant find any project match with id"
            })
        });
});
router.put("", (req, res) => {
    Stage.updateOne({ _id: req.body._id }, { stageName: req.body.stageName }, (err, res) => {
        if (err) {
            console.log(err)
        }
        console.log(res);
    }).exec().then(
        (result) => {
            res.status(200).json({
                message: "update successfully!",
                result: result

            })
        }
        ).catch((error) => {
            res.status(500).json({
                message: "update not successfully!",
                result: error

            })
        });
});




module.exports = router;