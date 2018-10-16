const mongoose = require('mongoose');

const supplierSchema =  {
    _id : mongoose.Schema.Types.ObjectId,
    email : {type : String , required : true},
    password : {type : String , required : true},
    organization : {type : String , required : true},
    role : {type : Number , required : true},
    name : {type : String , required : true},
}

module.exports = mongoose.model("Supplier",supplierSchema)