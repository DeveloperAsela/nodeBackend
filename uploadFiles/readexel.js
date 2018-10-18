const express = require("express");
const router = express.Router();
if (typeof require !== 'undefined') XLSX = require('xlsx');

router.post("", (req, res, next) => {
   const name = req.body.name;
    var workbook = XLSX.readFile(`./uploadFiles/temp/${name
    }.xlsx`);

    var sheet_name_list = workbook.SheetNames;
    list = [];
    sheet_name_list.forEach(element => {  
        data = XLSX.utils.sheet_to_json(workbook.Sheets[element]);
        obj = {
            sheetName : element,
            dataList : data
        }

        list.push(obj)
    
    });
    
    return res.status(200).json({
        childSheetList:sheet_name_list, 
         data:list
    })

});


module.exports = router;