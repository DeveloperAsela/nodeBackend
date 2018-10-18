const express = require('express');
const router = express.Router();
const multer = require('multer');


var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploadFiles/temp')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now()  + '-' + file.originalname)
    }
});

var upload = multer({ storage: storage }).single('file')


router.post("/upload", (req, res) => {

    upload(req, res, function (err) {
        if (err) {
            return res.status(501).json({
                error: err
            });
        }
        return res.status(501).json({
            originalname: req.file.originalname,
            uploadnnodemame: req.file.fileName
        });
    })
});
module.exports = router;