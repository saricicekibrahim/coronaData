const constants = require("./constants");
const csv = require('csv-parser');
const fs = require('fs');
const { Pool } = require("pg");

const pool = new Pool({
    user: "postgres",
    host: "localhost",
    database: "batuta",
    password: "postgres",
    port: "5432"
});

let insertPostgres = (_path) => {
    pool.query(
        "truncate table confirmed;"
    );
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
                    pool.query(
                        "insert into confirmed (province, region, day, value, geom) select $1, $2, $3, $4, st_setsrid(st_makepoint(" + result[3] + "," + result[2] + "),4326)",
                        [result[0], result[1], result[4], result[5]]
                    );
                    result = [];
                }
            });
        })
}

for (i = 0; i < paths.length; i++) {
    //only confirmed
    insertPostgres(paths[0]);
}