const express = require('express');
const app = express();

const bodyParser = require("body-parser");
const mongoose = require('mongoose');
const morgan = require('morgan');

const xlsx = require('xlsx');
const fs = require('fs');
const {google} = require('googleapis');
const drive = google.drive({version: 'v2'});


const user = require("./user/user.router");

const project = require("./project/project.router");
const stage = require('./stage/stage.router');


const area = require("./area/area.router");
const fileupload = require("./uploadFiles/file");


app.use(morgan('dev'));



app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());

var connect = mongoose.connect("mongodb://localhost:27017/mobitel", { useNewUrlParser: true });
if (connect) {
    console.log("connection is started.....")
} else {
    console.log("connection is error.....")
}


const port = 3000;

app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.header('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow


    // Request headers you wish to allow
    res.header('Access-Control-Allow-Headers', "Origin, X-Requested-With, Content-Type, Authorization");
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
        return res.status(200).json({})
    }

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    // res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});
app.get("",(req, res)=>{
    if(typeof require !== 'undefined') XLSX = require('xlsx');
    var workbook = XLSX.readFile('./uploadFiles/temp/test.xlsx');

    // var buffer = Buffer.concat(buffers);
    // var workbook = xlsx.parse(buffer);
    // console.log("workbook", workbook);

    // var sheet_name_list = workbook.SheetNames;
    // //if you have multiple sheets
    // data = xlsx.utils.sheet_to_json(workbook.Sheets[sheet_name_list[0]]); 

    // for(var key in data){
    //    console.log(data[key]['yourColumn']);
    // }
    var sheet_name_list = workbook.SheetNames;
    data = xlsx.utils.sheet_to_json(workbook.Sheets[sheet_name_list[0]]); 
    list = [];
    for (let i = 0; i < 2; i++) {
        const element = data[i];
         list.push(element)
        
    }
    return res.send(list)
})
app.use("/user", user);
app.use("/stage", stage);
app.use("/project", project);
app.use("/area", area);
app.use("/file", fileupload);


app.listen(port, (err) => {
    if (err) {
        console.log(err);
    }
    console.log("Server is listerning " + port + ".........")
})