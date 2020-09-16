import { validate as uuidValidate } from 'uuid';

const { Pool } = require('pg');

const pool = new Pool()

export default async (req, res) => {
	if (req.method === 'GET') {

		let result = null;
		try {
			result = await pool.query('SELECT school_id, lat, lon FROM locations ORDER BY random() limit 10;');
		} catch(e) {
			console.log(e)
		}

		let output = null;
		if(result) {
			res.statusCode = 200;
			res.setHeader('Content-Type', 'application/json');
			output = JSON.stringify(result.rows)
		} else {
			res.statusCode = 500
		}
		res.end(output);
	} else {
		// If it's not a GET request, return 405 - Method Not Allowed
		res.statusCode = 405;
		res.end();
	}
}
