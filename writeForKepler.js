const constants = require("./constants");
const csv = require('csv-parser');
const fs = require('fs');

var fileType = ".js";
let fileNames = [files[0] + fileType, files[1] + fileType];
let createJson = (_path, _fileName) => {
    let resultArr = [], result = [];;
    fs.createReadStream(_path)
        .pipe(csv())
        .on('data', (row) => {
            let keys = Object.keys(row);
            keys.forEach(key => {
                if (key !== province && key !== region && key !== lat && key !== lon) {
                    result.push(row[province]);
                    result.push(row[region]);
                    result.push(parseFloat(row[lat]));
                    result.push(parseFloat(row[lon]));
                    result.push(new Date(key));
                    result.push(row[key]);
                    resultArr.push(result);
                    result = [];
                }
            });
        })
        .on('end', () => {
            let jsonStr = "var mapData = " + JSON.stringify(resultArr);
            fs.writeFileSync(_fileName, jsonStr);
            console.log('Covid file ' + _fileName + ' successfully processed');
        });
}

for (i = 0; i < paths.length; i++) {
    createJson(paths[i], fileNames[i]);
}