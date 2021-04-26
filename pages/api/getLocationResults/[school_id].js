const {Pool} = require("pg");

const pool = new Pool();

export default async (req, res) => {
  if (req.method === "GET") {
    let result = null;
    const school_id = req.query.school_id;
    try {
      result = await pool.query(`
				SELECT count(CASE WHEN RESULT = 'yes' THEN 1 ELSE NULL END) AS yes_count,
				       count(CASE WHEN RESULT = 'no' THEN 1 ELSE NULL END) AS no_count,
				       count(CASE WHEN RESULT = 'maybe' THEN 1 ELSE NULL END) AS maybe_count,
				       count(1) AS total_count
				FROM crowdsourcing
				WHERE school_id = '${school_id}'`);
    } catch (e) {
      console.log(e);
    }
    let output = null;
    if (result) {
      res.statusCode = 200;
      res.setHeader("Content-Type", "application/json");
      output = JSON.stringify({
        yes_count: parseInt(result.rows[0]["yes_count"]),
        no_count: parseInt(result.rows[0]["no_count"]),
        maybe_count: parseInt(result.rows[0]["maybe_count"]),
        total_count: parseInt(result.rows[0]["total_count"]),
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
