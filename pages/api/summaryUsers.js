const {Pool} = require("pg");

const pool = new Pool();

export default async (req, res) => {
  if (req.method === "GET") {
    const campaign = req.query.campaign ? req.query.campaign : null;
    const names = req.query.names ? req.query.names : null;

    let namefield = "user_id";
    if (names) {
      namefield = "name";
    }
    let query = `SELECT ${namefield}, count(user_id) FROM crowdsourcing
					LEFT JOIN Users ON crowdsourcing.user_id=users.uuid`;
    if (campaign) {
      query += ` WHERE LOWER(team)=LOWER('${campaign}')`;
    }
    query += ` GROUP BY ${namefield} ORDER BY count DESC`;

    let result = null;
    try {
      result = await pool.query(query);
    } catch (e) {
      console.log(e);
    }

    if (result) {
      res.statusCode = 200;
      res.setHeader("Content-Type", "application/json");
      res.end(JSON.stringify(result.rows));
    } else {
      res.statusCode = 500;
      res.end();
    }
  } else {
    // If it's not a GET request, return 405 - Method Not Allowed
    res.statusCode = 405;
    res.end();
  }
};
