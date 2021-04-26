import {validate as uuidValidate} from "uuid";

const {Pool} = require("pg");
const pool = new Pool();

export default async (req, res) => {
  // Allow POST-requests only
  if (req.method !== "POST") {
    res.statusCode = 405;
    res.end();
  }

  const user_id = req.body.user_id;
  const uuid = req.body.uuid;

  if (!(user_id && uuid && uuidValidate(uuid))) {
    res.statusCode = 400;
    res.end();
  }

  const query = "UPDATE users SET uuid=($1) WHERE id=($2) AND uuid IS NULL RETURNING *;";

  try {
    await pool.query(query, [uuid, user_id]);

    res.statusCode = 200;
    res.end();
  } catch (err) {
    console.log(err.stack);

    res.statusCode = 404;
    res.end();
  }
};
