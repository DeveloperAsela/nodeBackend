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
const viewBoq = require('./uploadFiles/readexel');
const multer = require('multer');



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
    res.header('Access-Control-Allow-Origin', 'http://localhost:4200');
    res.header('Access-Control-Allow-Credentials','true')

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
app.get('', function (req, res) {
    res.send("sd")
})
app.use("/user", user);
app.use("/stage", stage);
app.use("/project", project);
app.use("/area", area);
app.use("/file", fileupload);
app.use("/view", viewBoq);

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './temp')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname)
    }
});

var upload = multer({ storage: storage }).single('file');


app.post("/upload", (req, res, next) => {

   
    upload(req, res, function (err) {
        if (err) {
            return res.status(501).json({
                error: err
            });
        }
        return res.status(200).json({
           message :  "fsdfdsfdsfsdfdsfsdf"
        });
    })
});



app.listen(port, (err) => {
    if (err) {
        console.log(err);
    }
    console.log("Server is listerning " + port + ".........")
})