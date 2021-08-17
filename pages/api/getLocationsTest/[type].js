const {Pool} = require("pg");

const pool = new Pool();
export default async (req, res) => {
  if (req.method === "GET") {
    let result = null;
    const type = req.query.type;
    try {
      result = await pool.query(`
					SELECT  locationsTest.id,
              st_asgeojson((ST_Dump(locationsTest.geom::geometry)).geom) AS geom,
              st_asgeojson(ST_centroid(locationsTest.geom)) as center,
              locationsTest.meta_data
					FROM locationsTest
      WHERE  locationsTest.meta_data->>'title' ilike '%${type}%'`);
    } catch (e) {
      console.log(e);
    }

    let output = null;
    if (result) {
      res.statusCode = 200;
      res.setHeader("Content-Type", "application/json");
      output = JSON.stringify(
        result.rows.map((row) => {
          row.geom = JSON.parse(row.geom);
          row.center = JSON.parse(row.center);
          row.metaData = row.meta_data;
          delete row.meta_data;
          return row;
        })
      );
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
