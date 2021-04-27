const {Pool} = require("pg");

const pool = new Pool();

export default async (req, res) => {
  if (req.method === "GET") {
    let taggings = null;
    let users = null;
    const campaign = req.query.campaign;

    try {
      taggings = await pool.query(`
				SELECT count(*)
					FROM crowdsourcing
					LEFT JOIN Users ON crowdsourcing.user_id=users.uuid
					WHERE LOWER(team)=LOWER('${campaign}');`);
      users = await pool.query(`
				SELECT count(*) FROM users WHERE LOWER(team)=LOWER('${campaign}');`);
    } catch (e) {
      console.log(e);
    }

    let output = null;
    if (taggings && users) {
      res.statusCode = 200;
      res.setHeader("Content-Type", "application/json");
      output = JSON.stringify({
        taggings: taggings.rows[0].count,
        users: users.rows[0].count,
      });
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
