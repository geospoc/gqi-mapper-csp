import { validate as uuidValidate } from 'uuid';

const { Pool } = require('pg');

const pool = new Pool()

const countryCodes = require('../../../data/countries.json');

/* Facts must have three components:
 * 1. A key identifier, e.g. top_country, the code to identify the fact. Key identifiers are stored
 * in an array 'factTypes'.
 * 2. A SQL query which gets a table with one column and one row. The column must be 
 * named the key identifier and the row must contain the value, e.g. the name of the top country.
 * Queries are stored in an array 'queries' whose order is parallel to that of 'factTypes', i.e. if 
 * the fact whose key identifier is 'top_country' is second in the factTypes array mentioned above,
 * its corresponding SQL query must be second in the queries array. 
 * 3. A message which is stored in a dictionary 'messages' with the key identifier as the key and the value
 * set to the text which will display on the result page, e.g. Your top country is Antarctica. 
 */
export default async (req, res) => {
	if (req.method === 'GET') {
		let result = null;
		var fact = null;
		const user_id = req.query.uuid;
		if (uuidValidate(user_id)) {
			try {
				// Fact keys
				const factTypes = [
					'country_count',
					'top_country',
					'num_countries_mapped_total',
					'num_locations_mapped_total'
				]
				// SQL queries which fetch facts
				const queries = [
				`SELECT count(1) as country_count
				FROM
				  (SELECT locations.country_code,
				          count(1) AS COUNT
				   FROM
				     (SELECT school_id
				      FROM crowdsourcing
				      WHERE user_id = '${user_id}') AS tagged
				   LEFT JOIN locations ON locations.school_id = tagged.school_id
				   GROUP BY locations.country_code) AS country_counts;`,
				`SELECT max(country_counts.country_code) AS top_country
				FROM
				  (SELECT locations.country_code,
				          count(1) AS count
				   FROM
				     (SELECT school_id
				      FROM crowdsourcing
				      WHERE user_id = '${user_id}') AS tagged
				   LEFT JOIN locations ON locations.school_id = tagged.school_id
				   GROUP BY locations.country_code) AS country_counts;`,
				`SELECT count(DISTINCT locations.country_code) AS num_locations_mapped_total
					FROM crowdsourcing
					LEFT JOIN locations ON locations.school_id = crowdsourcing.school_id;`,
				`SELECT COUNT(DISTINCT school_id) FROM crowdsourcing;`
				]
				const rand = Math.floor(Math.random() * queries.length);
				result = await pool.query(queries[rand]);
				const answer = result.rows[0][factTypes[rand]];

				// Fact messages
				const messages = {
					'country_count': `You have mapped locations in ${answer} countr${(answer == 1) ? 'y' : 'ies'}.`,
					'top_country': `Your top country is ${countryCodes[answer]}.`,
					'num_countries_mapped_total': `You are part of a global movement! Together, players have mapped locations in ${answer} countr${(answer == 1) ? 'y' : 'ies'}.`,
					'num_locations_mapped_total': `You are part of a global movement! Together, players have mapped ${answer} locations.`
				}

				fact = messages[factTypes[rand]];
			} catch(e) {
				console.log(e);
			}	
		}
		
		let output = null;
		if(result) {
			res.statusCode = 200;
			res.setHeader('Content-Type', 'application/json');
			output = JSON.stringify({'message': fact})
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

