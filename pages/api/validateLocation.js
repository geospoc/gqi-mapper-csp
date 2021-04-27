import {validate as uuidValidate} from "uuid";

const {Pool} = require("pg");

const pool = new Pool();

export default async (req, res) => {
  if (req.method === "POST") {
    // Validate that inputs are not null, and of the expected type
    if (
      req.body.user_id &&
      uuidValidate(req.body.user_id) &&
      req.body.school_id &&
      typeof req.body.school_id == "string" &&
      req.body.result &&
      typeof req.body.result == "string" &&
      ["yes", "no", "maybe"].indexOf(req.body.result) >= 0
    ) {
      // only then store this data into the database
      pool.query(
        "INSERT INTO crowdsourcing(user_id, school_id, result) VALUES($1, $2, $3) RETURNING *",
        [req.body.user_id, req.body.school_id, req.body.result],
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
