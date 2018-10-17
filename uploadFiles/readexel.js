if(typeof require !== 'undefined') XLSX = require('xlsx');
var workbook = XLSX.readFile('test.xlsx');

console.log(workbook)