/* eslint-disable */
const {SchoolRounded} = require("@material-ui/icons");
const {Pool} = require("pg");
const pgtools = require("pgtools");
const uuidv4 = require("uuid").v4;

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
  pgtools.createdb(config, process.env.PGDATABASE, async function (err, res) {
    if (err) {
      console.error(err);
      process.exit(-1);
    }
    await pool.query(`CREATE EXTENSION "uuid-ossp"`);
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
			id uuid,
			geom GEOMETRY,
			meta_data JSONB
		);
	`);
  await pool.query(`
		CREATE TYPE yesnomaybe AS ENUM ('yes', 'no', 'maybe');
		CREATE TABLE crowdsourcing(
			user_id TEXT,
			location_id uuid,
			result yesnomaybe,
			unique (user_id, location_id)
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
  for (let i = 0; i < schools.features.length; i++) {
    const {geometry, properties} = schools.features[i];
    let id = uuidv4();
    const res = await pool.query(
      `
			INSERT INTO locations(id, meta_data, geom) VALUES($1, $2, st_geomfromgeojson($3)) RETURNING *;`,
      [id, properties, geometry]
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

// createDB();
// createTables();
loadTables();
//dropTables();
// dropDB();
