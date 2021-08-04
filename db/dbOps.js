/* eslint-disable */
const {Pool} = require("pg");
const pgtools = require("pgtools");
const uuidv4 = require("uuid").v4;
const aws = require("aws-sdk");
const schoolsTest = require("../scripts/schoolsTest.json");
const hospitalsTest = require("../scripts/hospitalsTest.json");

require("dotenv").config();

const config = {
  user: process.env.PGUSER,
  host: process.env.PGHOST,
  password: process.env.PGPASSWORD,
  port: 5432,
};
const s3 = new aws.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_KEY_ACCESS,
});

async function getAllFileNamesFromS3Folder(folderName) {
  return new Promise((resolve, reject) => {
    const s3params = {
      Bucket: process.env.AWS_BUCKET_NAME,
      MaxKeys: 20,
      Delimiter: "/",
      Prefix: `${folderName}/`,
    };
    s3.listObjectsV2(s3params, (err, data) => {
      if (err) {
        reject(err);
      }
      resolve(
        data.Contents.filter(({Key}) => Key !== `${folderName}/`).map(({Key}) =>
          Key.replace(`${folderName}/`, "")
        )
      );
    });
  });
}
async function getFileFromS3(folderName, file) {
  const getParams = {
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: `${folderName}/${file}`,
  };
  return await s3.getObject(getParams).promise();
}
const pool = new Pool();

function createDB() {
  pgtools.createdb(config, process.env.PGDATABASE, async function (err, res) {
    if (err) {
      console.error(err);
      process.exit(-1);
    }
    await pool.query(`CREATE EXTENSION "uuid-ossp"`);
    await pool.end();
  });
}

async function createExtensions() {
  await pool.query(`CREATE EXTENSION "uuid-ossp"`);
  await pool.query(`CREATE EXTENSION "postgis"`);
  await pool.query(`CREATE EXTENSION "postgis_topology"`);
  await pool.query(`CREATE OR REPLACE FUNCTION public.mvt_tile(z integer, x integer, y integer, query_params json) RETURNS bytea AS $$
  DECLARE
    mvt bytea;
  BEGIN
    SELECT INTO mvt ST_AsMVT(tile, 'public.mvt_tile', 4096, 'geom') FROM (
      SELECT
        ST_AsMVTGeom(ST_Transform(geom::geometry, 3857), TileBBox(z, x, y, 3857), 4096, 64, true) AS geom,
        meta_data as properties
      FROM public.locations
      WHERE geom && TileBBox(z, x, y, 4326)
    ) as tile WHERE geom IS NOT NULL;
  
    RETURN mvt;
  END
  $$ LANGUAGE plpgsql IMMUTABLE STRICT PARALLEL SAFE;`);
  await pool.query(`create or replace function TileBBox (z int, x int, y int, srid int = 3857)
  returns geometry
  language plpgsql immutable as
$func$
declare
  max numeric := 20037508.34;
  res numeric := (max*2)/(2^z);
  bbox geometry;
begin
  bbox := ST_MakeEnvelope(
      -max + (x * res),
      max - (y * res),
      -max + (x * res) + res,
      max - (y * res) - res,
      3857
  );
  if srid = 3857 then
      return bbox;
  else
      return ST_Transform(bbox, srid);
  end if;
end;
$func$;`);
  await pool.end();
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
		CREATE TABLE locationsTest(
			id uuid,
			geom GEOMETRY,
			meta_data JSONB
		);
	`);
  await pool.query(`
		CREATE TYPE yesnomaybe AS ENUM ('yes', 'no', 'maybe');
		CREATE TABLE crowdsourcing(
			user_id TEXT,
			location_type TEXT,
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

async function loadTestTables() {
  for (let i = 0; i < schoolsTest.features.length; i++) {
    const {geometry, properties} = schoolsTest.features[i];
    let id = uuidv4();
    console.log(properties);
    const res = await pool.query(
      `
			INSERT INTO locationsTest(id, meta_data, geom) VALUES($1, $2, st_geomfromgeojson($3)) RETURNING *;`,
      [id, properties, geometry]
    );
    console.log(res);
  }
  for (let i = 0; i < hospitalsTest.features.length; i++) {
    const {geometry, properties} = hospitalsTest.features[i];
    let id = uuidv4();
    console.log(properties);
    const res = await pool.query(
      `
			INSERT INTO locationsTest(id, meta_data, geom) VALUES($1, $2, st_geomfromgeojson($3)) RETURNING *;`,
      [id, properties, geometry]
    );
    console.log(res);
  }
  await pool.end();
}

async function loadLocations(folderName, file) {
  try {
    const locations = await getFileFromS3(folderName, file);
    const data = JSON.parse(locations.Body.toString());
    const bulkData = [];
    for (let i = 0; i < data.features.length; i++) {
      const {geometry, properties} = data.features[i];
      let id = uuidv4();

      bulkData.push({
        id,
        meta_data: properties,
        geom: geometry,
      });
    }
    let allRows = bulkData.map(
      (row) =>
        `('${row.id}', '${JSON.stringify(
          row.meta_data
        )}', st_geomfromgeojson('${JSON.stringify(row.geom)}'))`
    );
    const res = await pool.query(
      `
      INSERT INTO locations(id, meta_data, geom) VALUES ${allRows.join(",")} RETURNING *;`
    );
    return {
      file,
      success: true,
    };
  } catch (error) {
    return {
      file,
      success: false,
      error,
    };
  }
}

async function dropTables() {
  await pool.query(
    `DROP TABLE IF EXISTS locations; DROP TABLE IF EXISTS crowdsourcing;  DROP TABLE IF EXISTS crowdusers; DROP TABLE IF EXISTS users; DROP TABLE IF EXISTS accounts; DROP TYPE IF EXISTS yesnomaybe;`
  );
  await pool.end();
}

async function getUnprocessedS3files() {
  try {
    const folderName = "unprocessed_data";
    const files = await getAllFileNamesFromS3Folder(folderName);
    let results = files.map(
      async (file) => await moveFile(folderName, file, "processing")
    );
    results = await Promise.all(results);
    results = results.map(async (file) => await loadLocations(folderName, file));
    results = await Promise.all(results);
    const successresults = results.filter((obj) => obj.success === true);
    const errorresults = results.filter((obj) => obj.success === false);
    successresults.forEach(
      async (resultObject) =>
        await moveFile("processing", resultObject.file, "processed_data")
    );
    errorresults.forEach(
      async (resultObject) =>
        await moveFile("processing", resultObject.file, "failed_records")
    );
    await pool.end();
  } catch (error) {
    console.log(error);
  }
}
async function moveFile(sourceFolder, file, destinationFolder) {
  const copyParams = {
    Bucket: process.env.AWS_BUCKET_NAME,
    CopySource: `${process.env.AWS_BUCKET_NAME}/${sourceFolder}/${file}`,
    Key: `${destinationFolder}/${file}`,
  };
  const deleteParams = {
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: `${sourceFolder}/${file}`,
  };
  s3.copyObject(copyParams, function (err, data) {
    if (err) console.log(err, err.stack);
    // an error occurred
    else {
      s3.deleteObject(deleteParams, function (err, data) {
        if (err) console.log(err, err.stack);
        // error
        else console.log(); // deleted
      });
    } // successful response
  });
  return file;
}

// Uncoment any of the lines below, one at a time, to execute each of the needed self-explanatory functions

// createDB();
// createExtensions();
// createTables();
// loadTestTables();
getUnprocessedS3files();
//dropTables();
// dropDB();
// getData();
