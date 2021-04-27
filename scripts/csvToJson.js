/*
 * This file was used on Jan 15, 2020 to process a spreadsheet of nominees (in CSV format)
 * and automatically generate Json files for each entry in the spreadsheet.
 *
 * It was not designed to be fool-proof, but only an assist in automating the task of
 * processing multiple entries.
 *
 * This script should be run in its current folder with the following command:
 * node csvToJson.js
 *
 */

const fs = require("fs");
const csv = require("csvtojson");
// const countries = require("../data/countries.json");

// Set CSV file to process
const csvFilePath = "schools.csv";
const jsonFilePath = "schools.json";

csv()
  .fromFile(csvFilePath)
  .then((jsonObj) => {
    // Remove empty rows
    //jsonObj = jsonObj.filter(item => item['game'] === 'X');

    for (let i = 0; i < jsonObj.length; i++) {
      // Parse floats from string coordinates
      jsonObj[i]["lat"] = parseFloat(jsonObj[i]["lat"]);
      jsonObj[i]["lon"] = parseFloat(jsonObj[i]["lon"]);

      // // Parse ID as integer, and delete the old field
      // jsonObj[i]['id']=parseInt(jsonObj[i]['school id ref for game']);
      // delete jsonObj[i]['school id ref for game'];

      // Parse school as true/false from yes/no, and delete the old field
      jsonObj[i]["school"] =
        jsonObj[i]["status"] == "yes"
          ? true
          : jsonObj[i]["status"] == "no"
          ? false
          : null;
      delete jsonObj[i]["status"];

      // Parse country code from country name, and delete the old field
      // jsonObj[i]['country_code']=Object.keys(countries).find(key => countries[key] === jsonObj[i]['country']);
      jsonObj[i]["country_code"] = jsonObj[i]["country"];
      delete jsonObj[i]["country"];
    }

    fs.writeFile(
      jsonFilePath,
      JSON.stringify(jsonObj, null, 4) + "\n",
      "utf8",
      function (err) {
        if (err) {
          console.log(
            "An error occured while writing JSON Object from file: " + jsonFilePath
          );
          return console.log(err);
        }
      }
    );
  });
