const express = require('express');
const router = express.Router();
const multer = require('multer');
if (typeof require !== 'undefined') XLSX = require('xlsx');


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
        return res.status(200).json({
            originalname: req.file.originalname,
            uploadname: req.file.fileName
        });
    })
});



router.get("/upload/:name", (req, res) => {
    const name = req.params.name;
    var workbook = XLSX.readFile(`./uploadFiles/temp/${name}.xlsx`);

    var sheet_name_list = workbook.SheetNames;
    list = [];
    sheet_name_list.forEach(element => {
        data = XLSX.utils.sheet_to_json(workbook.Sheets[element]);
        obj = {
            sheetName: element,
            dataList: data
        }

        list.push(obj)

    });

    return res.status(200).json({
        childSheetList: sheet_name_list,
        data: list
    })

});
module.exports = router;