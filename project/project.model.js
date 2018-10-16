const mongoose = require('mongoose');


const projectSchema = mongoose.Schema({

    _id: mongoose.Schema.Types.ObjectId,
    stageName: { type: String, required: true },
    areaName: { type: String, required: true },
    type: { type: String, required: true },
    uploadFile: { type: String, required: true },

    
});

module.exports = mongoose.model("Project", projectSchema);
