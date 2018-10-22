const express = require('express');
const router = express.Router();
const url = require('url');
const mongoose = require('mongoose');
const Project = require('./project.model');
const multer = require('multer');


/** 
 * add a new Project
 * 
**/



router.post("/add", (req, res) => {

    const project = new Project({
        _id: mongoose.Types.ObjectId(),
        stageName: req.body.stageName,
        areaName: req.body.areaName,
        type: req.body.type,
        boqFileName: req.body.boqFileName

    });
    project.save().then(
        (result) => {
            console.log(result);
            return res.status(200).json({
                "sucess": "project is added successfully"
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

router.post("/sort", (req, res) => {
    Project.find({
        stageName : req.body.projectName,
        areaName : req.body.projectArea,
        type : req.body.projectType,


    }).exec().then(
        (result) => {
            return res.status(200).json({
                result : result
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
/**get all the supplier's register request**/
router.get("/list", (req, res) => {
    Project.find({}).exec().then(
        (result) => {
            if (result) {
                res.status(200).json({
                    project: result
                });
            } else {
                res.status(200).json({
                    projects: "no result there"
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
/**delete one supplier's register request**/
router.delete("/:id", (req, res) => {
    var query = url.parse(req.url, true).query;
    console.log(query, req.params, "ABCDEFGH")
    Project.deleteOne({ _id: req.params.id }, (err) => {
        console.log(err, "database error")
    }).exec().then((result) => {
        console.log(result);
        return res.status(200).json({
            "sucess": "project is deleted successfully"
        })
    }
    ).catch((error) => {
        return res.status(500).json({
            error: error,
            message: "cant find any project match with id"
        })
    });
});
/**  update project name **/
router.put("", (req, res) => {
    Project.updateOne({ _id: req.body._id }, { name: req.body.name }, (err, res) => {
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