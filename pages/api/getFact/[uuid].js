import { validate as uuidValidate } from 'uuid';

const { Pool } = require('pg');

const pool = new Pool()

export default async (req, res) => {
	if (req.method === 'GET') {
		let result = null;
		const user_id = req.query.uuid;
		if (uuidValidate(user_id)) {
			const queries = [
			`SELECT count(tagged.school_id) AS mapped_count
			FROM
			  (SELECT school_id
			   FROM crowdsourcing
			   WHERE user_id = '${user_id}') AS tagged;`,
			`SELECT max(country_counts.country_code) AS top_country
			FROM
			  (SELECT locations.country_code,
			          count(1) AS COUNT
			   FROM
			     (SELECT school_id
			      FROM crowdsourcing
			      WHERE user_id = '${user_id}') AS tagged
			   LEFT JOIN locations ON locations.school_id = tagged.school_id
			   GROUP BY locations.country_code) AS country_counts;`
			]
			try {
				result = await pool.query(queries[Math.floor(Math.random() * queries.length)]);
			} catch(e) {
				console.log(e);
			}	
		}

		let output = null;
		if(result) {
			res.statusCode = 200;
			res.setHeader('Content-Type', 'application/json');
			output = JSON.stringify(result.rows[0])
		} else {
			res.statusCode = 500;
		}
		res.end(output);
	} else {
		// If it's not a GET request, return 405 - Method Not Allowed
		res.statusCode = 405;
		res.end();
	}
}
