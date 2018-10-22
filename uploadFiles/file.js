const express = require('express');
const router = express.Router();
const multer = require('multer');


var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './temp')
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now())
    }
});

var upload = multer({ storage: storage }).single('file')

router.get("",(req, res)=>{
    return res.status(501).json({
       message : "someyhing is good"
    });
})


router.post("/upload", (req, res, next) => {

   
    upload(req, res, function (err) {
        if (err) {
            return res.status(501).json({
                error: err
            });
        }
        return res.status(501).json({
            originalFileName: req.file.originalFileName,
            uploadFileName: req.file.fileName
        });
    })
});



module.exports = router;