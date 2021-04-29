const countryCodes = require("./countryCodes.json");

function createCountryCodesJson() {
  var obj = {};
  for (var i = 0; i < countryCodes.length; i++) {
    let element = countryCodes[i];
    obj[element["Code"]] = element["Name"];
  }
  console.log(obj);

  var fs = require("fs");
  fs.writeFile("data/countries.json", JSON.stringify(obj), function (err, result) {
    if (err) console.log("error", err);
    else console.log(result);
  });
}

createCountryCodesJson();
