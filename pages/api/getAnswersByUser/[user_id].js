const {Pool} = require("pg");

const pool = new Pool();

export default async (req, res) => {
  if (req.method === "GET") {
    try {
      const user_id = req.query.user_id;
      const result = await pool.query(
        `SELECT user_id, school_id, result FROM crowdsourcing WHERE user_id ='${user_id}';`
      );
      if (result) {
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.end(JSON.stringify(result.rows));
      }
    } catch (e) {
      console.log(e);
    }
  }
};
