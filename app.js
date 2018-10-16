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
const supplier = require("./supplier/supplier.router");
const project = require("./project/project.router");
const stage = require("./project/stage.router");


const area = require("./area/area.router");

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

app.use("/user", user);
app.use("/project", project);
app.use("/stage", stage);
app.use("/area", area);


app.listen(port, (err) => {
    if (err) {
        console.log(err);
    }
    console.log("Server is listerning " + port + ".........")
})