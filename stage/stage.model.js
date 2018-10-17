const mongoose = require('mongoose');

const stageSchema = mongoose.Schema({

    _id: mongoose.Schema.Types.ObjectId,
    stageName: { type: String, required: true },
    areas: {type : Array},
});
module.exports = mongoose.model("Stage", stageSchema);
