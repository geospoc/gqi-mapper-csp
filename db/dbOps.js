const { Pool } = require('pg');
const pgtools = require("pgtools");

const schools = require('../scripts/schools.json');
const countryCodes = require('../scripts/countryCodes.json');

require('dotenv').config();


const config = {
  user: process.env.PGUSER,
  host: process.env.PGHOST,
  password: process.env.PGPASSWORD,
  port: 5432
};

const pool = new Pool()

function createDB() {
	pgtools.createdb(config, process.env.PGDATABASE, function(err, res) {
		if (err) {
			console.error(err);
			process.exit(-1);
		}	
	});
}

function dropDB(){
	pgtools.dropdb(config, process.env.PGDATABASE, function (err, res) {
	    if (err) {
			console.error(err);
			process.exit(-1);
	    }
  	});
  	console.log("Dropped tables");
}

async function createTables() {
	await pool.query(`
		CREATE TABLE locations(
			school_id INTEGER,
			lat REAL,
			lon REAL,
			school BOOLEAN,
			country_code TEXT,
			unique (school_id)
		);
	`);
	await pool.query(`
		CREATE TYPE yesnomaybe AS ENUM ('yes', 'no', 'maybe');
		CREATE TABLE crowdsourcing(
			user_id TEXT,
			school_id INTEGER,
			result yesnomaybe,
			unique (user_id, school_id)
		);
	`);
	await pool.query(`
		CREATE TABLE crowdusers(
			user_id TEXT,
			ip INET
		);
	`);
	await pool.query(`
		CREATE TABLE countries(
			country_code TEXT,
			country_name TEXT
		);
	`);
	await pool.end()
}

async function loadTables() {
	for (let i = 0; i < schools.length; i++) {
		console.log(schools[i]);
		const res = await pool.query(`
			INSERT INTO locations(school_id, lat, lon, school, country_code) VALUES($1, $2, $3, $4, $5) RETURNING *;`,
			[schools[i].id, schools[i].lat, schools[i].lon, schools[i].school, schools[i].country_code]);
		console.log(res)
	}

	for (let i = 0; i < countryCodes.length; i++) {
		console.log(countryCodes[i]);
		const res = await pool.query(`
			INSERT INTO countries(country_code, country_name) VALUES($1, $2) RETURNING *;`, 
			[countryCodes[i]["Code"], countryCodes[i]["Name"]]);
		console.log(res);
	}
	await pool.end()
}

async function dropTables() {
	await pool.query(`DROP TABLE IF EXISTS locations; DROP TABLE IF EXISTS crowdsourcing; DROP TYPE IF EXISTS yesnomaybe; DROP TABLE IF EXISTS crowdusers; DROP TABLE IF EXISTS countries;`);
	await pool.end();
}


// Uncoment any of the lines below, one at a time, to execute each of the needed self-explanatory functions

//createDB();
//createTables();
//loadTables();
//dropTables();
//dropDB();


