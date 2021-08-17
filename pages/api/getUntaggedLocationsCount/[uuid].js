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
					SELECT COUNT(locations.id)
					FROM locations
					LEFT JOIN
						(SELECT location_id
						 FROM crowdsourcing
						 WHERE user_id = '${user_id}') AS tagged 
							ON locations.id = tagged.location_id
					WHERE tagged.location_id IS NULL
          AND locations.meta_data->>'title' ilike '%${type}%' AND st_geometrytype(locations.geom)= 'ST_Polygon' ;`);
      } catch (e) {
        console.log(e);
      }
    }

    let output = null;
    if (result) {
      res.statusCode = 200;
      res.setHeader("Content-Type", "application/json");
      output = JSON.stringify({count: parseInt(result.rows[0]["count"])});
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
