

const mongoose = require('mongoose');
const areaSchema = require('../area/area.model');

const projectSchema = mongoose.Schema({

    _id: mongoose.Schema.Types.ObjectId,
    name: { type: String, required: true },
    areas: [
        {
            areaName: { type: String, required: true },
            behaviour: {
                implement: { type: Boolean, required: true },
                supply: { type: Boolean, required: true }
            }
        }
    ],
    uploadFile  :  {type: String, required : true}
});

const stageSchema = mongoose.Schema({

    _id: mongoose.Schema.Types.ObjectId,
    stageName: { type: String, required: true },
    areas: {type : Array},
});

module.exports = mongoose.model("Project", projectSchema);
module.exports = mongoose.model("Stage", stageSchema);
