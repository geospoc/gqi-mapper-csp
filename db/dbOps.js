/* eslint-disable */
const {Pool} = require("pg");
const pgtools = require("pgtools");

const schools = require("../scripts/schools.json");

require("dotenv").config();

const config = {
  user: process.env.PGUSER,
  host: process.env.PGHOST,
  password: process.env.PGPASSWORD,
  port: 5432,
};

const pool = new Pool();

function createDB() {
  pgtools.createdb(config, process.env.PGDATABASE, function (err, res) {
    if (err) {
      console.error(err);
      process.exit(-1);
    }
  });
}

function dropDB() {
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
			school_id TEXT,
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
			school_id TEXT,
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
		CREATE TABLE accounts
		(
			id                   SERIAL,
			compound_id          VARCHAR(255) NOT NULL,
			user_id              INTEGER NOT NULL,
			provider_type        VARCHAR(255) NOT NULL,
			provider_id          VARCHAR(255) NOT NULL,
			provider_account_id  VARCHAR(255) NOT NULL,
			refresh_token        TEXT,
			access_token         TEXT,
			access_token_expires TIMESTAMPTZ,
			created_at           TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
			updated_at           TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
			PRIMARY KEY (id)
		);
	`);
  await pool.query(`
		CREATE TABLE users
		(
			id             SERIAL,
			name           VARCHAR(255),
			email          VARCHAR(255),
			email_verified TIMESTAMPTZ,
			image          VARCHAR(255),
			created_at     TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
			updated_at     TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
			uuid           TEXT,
			team           TEXT DEFAULT 0,
			PRIMARY KEY (id)
		);
	`);

  await pool.end();
}

async function loadTables() {
  for (let i = 0; i < schools.length; i++) {
    console.log(schools[i]);
    const res = await pool.query(
      `
			INSERT INTO locations(school_id, lat, lon, school, country_code) VALUES($1, $2, $3, $4, $5) RETURNING *;`,
      [
        schools[i].id,
        schools[i].lat,
        schools[i].lon,
        schools[i].school,
        schools[i].country_code,
      ]
    );
    console.log(res);
  }
  await pool.end();
}

async function dropTables() {
  await pool.query(
    `DROP TABLE IF EXISTS locations; DROP TABLE IF EXISTS crowdsourcing;  DROP TABLE IF EXISTS crowdusers; DROP TABLE IF EXISTS users; DROP TABLE IF EXISTS accounts; DROP TYPE IF EXISTS yesnomaybe;`
  );
  await pool.end();
}

// Uncoment any of the lines below, one at a time, to execute each of the needed self-explanatory functions

//createDB();
//createTables();
//loadTables();
//dropTables();
//dropDB();
