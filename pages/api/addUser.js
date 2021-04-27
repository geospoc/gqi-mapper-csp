import {validate as uuidValidate} from "uuid";
import requestIp from "request-ip";

const {Pool} = require("pg");

const pool = new Pool();

export default async (req, res) => {
  if (req.method === "POST") {
    // Validate that inputs are not null, and of the expected type
    if (req.body.user_id && uuidValidate(req.body.user_id)) {
      const clientIp = requestIp.getClientIp(req);

      // only then store this data into the database
      pool.query(
        "INSERT INTO crowdusers(user_id, ip) VALUES($1, $2) RETURNING *",
        [req.body.user_id, clientIp],
        (err, res) => {
          console.log(err ? err.stack : res.rows[0]);
        }
      );
    }

    // return an unconditional success response
    res.statusCode = 200;
    res.end();
  } else {
    // If it's not a POST request, return 405 - Method Not Allowed
    res.statusCode = 405;
    res.end();
  }
};
