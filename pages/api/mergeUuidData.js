import {validate as uuidValidate} from "uuid";

const {Pool} = require("pg");
const pool = new Pool();

export default async (req, res) => {
  // Allow POST-requests only
  if (req.method !== "POST") {
    res.statusCode = 405;
    res.end();
  }

  const from_uuid = req.body.from_uuid;
  const to_uuid = req.body.to_uuid;

  if (!(from_uuid && to_uuid && uuidValidate(from_uuid) && uuidValidate(to_uuid))) {
    res.statusCode = 400;
    res.end();
  }

  const deleteQuery = `DELETE FROM crowdsourcing
                        WHERE user_id=($1)
                        RETURNING *;`;

  const insertQuery = `INSERT INTO crowdsourcing (user_id, school_id, result)
                        VALUES ($1, $2, $3)
                        ON CONFLICT (user_id, school_id)
                        DO NOTHING
                        RETURNING *;`;

  try {
    const deletedRes = await pool.query(deleteQuery, [from_uuid]);
    const insertedRows = [];

    deletedRes.rows.forEach(async (row) => {
      const insertedRes = await pool.query(insertQuery, [
        to_uuid,
        row.school_id,
        row.result,
      ]);
      insertedRows.push(insertedRes.rows[0]);
    });

    res.statusCode = 200;
    res.end(JSON.stringify(insertedRows));
  } catch (err) {
    console.log(err.stack);
    res.statusCode = 404;
    res.end();
  }
};
