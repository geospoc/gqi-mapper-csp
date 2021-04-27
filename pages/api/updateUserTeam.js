import {validate as uuidValidate} from "uuid";

const {Pool} = require("pg");
const pool = new Pool();

export default async (req, res) => {
  // Allow POST-requests only
  if (req.method !== "POST") {
    res.statusCode = 405;
    res.end();
  }

  const uuid = req.body.uuid;
  const team = req.body.team;

  if (!(uuid && uuidValidate(uuid))) {
    res.statusCode = 400;
    res.end();
  }

  const query = "UPDATE users SET team=($1) WHERE uuid=($2);";

  try {
    await pool.query(query, [team, uuid]);

    res.statusCode = 200;
    res.end();
  } catch (err) {
    console.log(err.stack);

    res.statusCode = 404;
    res.end();
  }
};
