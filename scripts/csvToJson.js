/*
 * This file was used on Jan 15, 2020 to process a spreadsheet of nominees (in CSV format)
 * and automatically generate Json files for each entry in the spreadsheet.
 *
 * It was not designed to be fool-proof, but only an assist in automating the task of
 * processing multiple entries. 
 *
 * This script was executed inside a tmp/ folder with the following command:
 * node ../scripts/csvToJson.js
 *
 * Additional changes were done manually, and when all json files were compliant with 
 * the schema, they were moved to the nominees/ folder.
 */

const fs = require('fs');
const csv = require('csvtojson');

// Set CSV file to process
const csvFilePath='schools.csv';
const jsonFilePath='schools.json';

csv()
.fromFile(csvFilePath)
.then((jsonObj)=>{

  // Remove empty rows
  //jsonObj = jsonObj.filter(item => item['game'] === 'X');

  for (let i=0; i<jsonObj.length; i++) {

      // Remove unneeded fields from spreadsheet
      delete jsonObj[i]['game']
      delete jsonObj[i]['field7']
      delete jsonObj[i]['field8']
      delete jsonObj[i]['field9']
      delete jsonObj[i]['field10']
      delete jsonObj[i]['field11']
      delete jsonObj[i]['field12']
      delete jsonObj[i]['field13']
      delete jsonObj[i]['field14']
      delete jsonObj[i]['field15']
      delete jsonObj[i]['field16']

      // Parse floats from string coordinates
      jsonObj[i]['lat']=parseFloat(jsonObj[i]['lat']);
      jsonObj[i]['lon']=parseFloat(jsonObj[i]['lon']);

      // Parse ID as integer, and delete the old field
      jsonObj[i]['id']=parseInt(jsonObj[i]['school id ref for game']);
      delete jsonObj[i]['school id ref for game'];

      // Parse school as true/false from yes/no, and delete the old field
      jsonObj[i]['school']=(jsonObj[i]['school pattern'] == 'yes') ? true : false;
      delete jsonObj[i]['school pattern'];

      delete jsonObj[i]['res check'];
      delete jsonObj[i]['image notes'];
      delete jsonObj[i]['school id notes'];
      delete jsonObj[i]['country'];

  }

  fs.writeFile(jsonFilePath, JSON.stringify(jsonObj, null, 4) + "\n", 'utf8', function (err) {
    if (err) {
      console.log("An error occured while writing JSON Object from file: "+files[i]);
      return console.log(err);
    }
  });
});
 