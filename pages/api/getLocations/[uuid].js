import {validate as uuidValidate} from "uuid";

const {Pool} = require("pg");

const pool = new Pool();

export default async (req, res) => {
  if (req.method === "GET") {
    let result = null;
    const user_id = req.query.uuid;
    const type = req.query.type;
    if (uuidValidate(user_id)) {
      try {
        result = await pool.query(`
					SELECT  locations.id,
              st_asgeojson((ST_Dump(locations.geom::geometry)).geom) AS geom,
              st_asgeojson(ST_centroid(locations.geom)) as center,
              locations.meta_data
					FROM locations
					LEFT JOIN
						(SELECT location_id
						 FROM crowdsourcing
						 WHERE user_id = '${user_id}') AS tagged 
							ON locations.id = tagged.location_id
					WHERE tagged.location_id IS NULL
          AND locations.meta_data->>'title' ilike '%${type}%' AND st_geometrytype(locations.geom)= 'ST_Polygon'
					ORDER BY random() LIMIT 10;`);
      } catch (e) {
        console.log(e);
      }
    }

    let output = null;
    if (result) {
      res.statusCode = 200;
      res.setHeader("Content-Type", "application/json");
      output = JSON.stringify(
        result.rows.map((row) => {
          row.geom = JSON.parse(row.geom);
          row.center = JSON.parse(row.center);
          row.metaData = row.meta_data;
          delete row.meta_data;
          return row;
        })
      );
    } else {
      res.statusCode = 500;
    }
    res.end(output);
  } else {
    // If it's not a GET request, return 405 - Method Not Allowed
    res.statusCode = 405;
    res.end();
  }
};
