const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    
    _id: mongoose.Schema.Types.ObjectId,
    nicNumber: {type : String , required : true},
    district: {type : String , required : true},
    city: {type: String, required: true },
    password: {type: String, required: true }
});

module.exports = mongoose.model("User", userSchema)