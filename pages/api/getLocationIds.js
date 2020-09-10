import { validate as uuidValidate } from 'uuid';

const { Pool } = require('pg');

const pool = new Pool()

export default async (req, res) => {
  if (req.method === 'GET') {

  		pool.query('SELECT school_id FROM locations ORDER BY school_id;', (err, result) => {
        res.statusCode = 200;
        if(!err) {
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify(result.rows))
        } else {
          res.end();
        }
			});
  } else {
  	// If it's not a GET request, return 405 - Method Not Allowed
    res.statusCode = 405;
    res.end();
  }
}
