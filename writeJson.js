const constants = require("./constants");
const csv = require('csv-parser');
const fs = require('fs');

var fileType = ".json";
let fileNames = [files[0] + fileType, files[1] + fileType];

let createJson = (_path, _fileName) => {
    let resultArr = [], result = {};
    fs.createReadStream(_path)
        .pipe(csv())
        .on('data', (row) => {
            let keys = Object.keys(row);
            result.province = row[province];
            result.region = row[region];
            result.lat = row[lat];
            result.lon = row[lon];

            keys.forEach(key => {
                if (key !== province && key !== region && key !== lat && key !== lon) {
                    result.date = new Date(key);
                    result.value = row[key];
                    let resutToSet = {};
                    resutToSet.province = result.province;
                    resutToSet.region = result.region;
                    resutToSet.lat = result.lat;
                    resutToSet.lon = result.lon;
                    resutToSet.date = new Date(result.date);
                    resutToSet.value = result.value;
                    resultArr.push(resutToSet);
                }
            });
        })
        .on('end', () => {
            let jsonStr = JSON.stringify(resultArr);
            fs.writeFileSync(_fileName, jsonStr);
            console.log('Covid file successfully processed');
        });
}

for (i = 0; i < paths.length; i++) {
    createJson(paths[i], fileNames[i]);
}