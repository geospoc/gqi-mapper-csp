import { validate as uuidValidate } from 'uuid';

const { Pool } = require('pg');

const pool = new Pool()

export default async (req, res) => {
	if (req.method === 'GET') {

		let result = null;
		try {
			result = await pool.query('select user_id, count(user_id) from crowdsourcing GROUP BY user_id order by count DESC;');
		} catch(e) {
			console.log(e);
		}

		let output = null;
		if(result) {
			res.statusCode = 200;
			res.setHeader('Content-Type', 'application/json');
			res.end(JSON.stringify(result.rows))
		} else {
			res.statusCode = 500;
			res.end();
		}
		
	} else {
		// If it's not a GET request, return 405 - Method Not Allowed
		res.statusCode = 405;
		res.end();
	}
}
