import {validate as uuidValidate} from "uuid";

const {Pool} = require("pg");

const pool = new Pool();

export default async (req, res) => {
  if (req.method === "GET") {
    let result = null;
    const user_id = req.query.uuid;
    if (uuidValidate(user_id)) {
      try {
        result = await pool.query(`SELECT  team FROM users WHERE uuid='${user_id}';`);
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
