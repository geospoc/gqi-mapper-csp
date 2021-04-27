import {validate as uuidValidate} from "uuid";

const {Pool} = require("pg");

const pool = new Pool();

export default async (req, res) => {
  if (req.method === "GET") {
    let result = null;
    const user_id = req.query.uuid;
    if (uuidValidate(user_id)) {
      try {
        result = await pool.query(`
					SELECT  locations.school_id,
							locations.lat,
							locations.lon,
							locations.country_code
					FROM locations
					LEFT JOIN
						(SELECT school_id
						 FROM crowdsourcing
						 WHERE user_id = '${user_id}') AS tagged 
							ON locations.school_id = tagged.school_id
					WHERE tagged.school_id IS NULL
					ORDER BY random() LIMIT 10;`);
      } catch (e) {
        console.log(e);
      }
    }

    let output = null;
    if (result) {
      res.statusCode = 200;
      res.setHeader("Content-Type", "application/json");
      output = JSON.stringify(result.rows);
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
