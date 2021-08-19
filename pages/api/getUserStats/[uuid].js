import {validate as uuidValidate} from "uuid";

const {Pool} = require("pg");

const pool = new Pool();

export default async (req, res) => {
  if (req.method === "GET") {
    let result = null;
    const user_id = req.query.uuid;
    const type = req.query.type;
    let subQuery = `SELECT location_id FROM crowdsourcing WHERE user_id = '${user_id}'`;
    if (type) {
      subQuery = subQuery + ` AND location_type ilike '%${type}%'`;
    }
    if (uuidValidate(user_id)) {
      try {
        result = await pool.query(`
					SELECT  count(tagged.location_id) as mapped_count
					FROM (${subQuery}) AS tagged;`);
      } catch (e) {
        console.log(e);
      }
    }

    let output = null;
    if (result) {
      res.statusCode = 200;
      res.setHeader("Content-Type", "application/json");
      output = JSON.stringify(result.rows[0]);
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
