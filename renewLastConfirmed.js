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


pool.query(
    `
    drop table if exists last_confirmed;
    select province, region, day, geom, value 
    into last_confirmed
    from confirmed where day = (
    select max(day) from confirmed c2) 
    group by province, region, day, geom, value
    order by region;
    alter table last_confirmed add column id serial;
    ALTER TABLE public.last_confirmed ADD CONSTRAINT last_confirmed_pk PRIMARY KEY (id);
    `
);
