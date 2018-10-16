const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    
    _id: mongoose.Schema.Types.ObjectId,
    firstname : {type : String , required : true},
    lastname : {type : String , required : true},
    email: { type: String, required: true },
    password: { type: String, required: true },
    mobile : {type : String , required : true},
    role : {type : Number , required : true},
    

});

module.exports = mongoose.model("User", userSchema)