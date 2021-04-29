const {Pool} = require("pg");

const pool = new Pool();

export default async (req, res) => {
  if (req.method === "GET") {
    let result = null;
    try {
      result = await pool.query("SELECT school_id FROM locations ORDER BY school_id;");
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
