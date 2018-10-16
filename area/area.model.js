const mongoose = require('mongoose');

const areaSchema = mongoose.Schema({

    _id: mongoose.Schema.Types.ObjectId,
    areaName: { type: String, required: true },
    behaviour: {
        implement: { type: Boolean, required: true },
        supply: { type: Boolean, required: true }
    }
});

module.exports = mongoose.model("Area", areaSchema);