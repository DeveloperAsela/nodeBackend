const express = require('express');
const mongoose = require('mongoose');
const routerArea = express.Router();
const Area = require('./area.model');
/** 
 * add a new Area
 * 
**/
routerArea.post("", (req, res) => {
    console.log(req.body);
    const area = new Area({
        _id: mongoose.Types.ObjectId(),
        areaName: req.body.areaName,
        behaviour: {
            implement: false,
            supply: false
        }

    });

    console.log(area)
    area.save().then(
        (result) => {
            console.log(result);
            return res.status(200).json({
                "sucess": "Area is added successfully"
            });
        }
    ).catch(
        error => {
            return res.status(500).json({
                "error": error
            })
        }
    );
});
/**get all the area's **/
routerArea.get("", (req, res) => {
    Area.find({}).exec().then(
        (result) => {
            if (result) {
                res.status(200).json({
                    area: result
                });
            } else {
                res.status(200).json({
                    area: "no result there"
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
/**
 * delete area 
*/
routerArea.delete("", (req, res) => {
    Area.deleteOne({ _id: req.body._id }, (err) => {
        console.log(err, "database error")
    }).exec().then((result) => {
        console.log(result);
        return res.status(200).json({
            "sucess": "area is deleted successfully"
        })
    }
    ).catch((error) => {
        return res.status(500).json({
            error: error,
            message: "cant find any area match with id"
        })
    });
});
/** 
 * update area
 * 
*/
routerArea.put("", (req, res) => {
    Area.updateOne({ _id: req.body._id }, {
        areaName: req.body.areaName,
        implement: req.body.behaviour.implement,
        supply: req.body.behaviour.supply
    }, (err, res) => {
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
module.exports = routerArea;