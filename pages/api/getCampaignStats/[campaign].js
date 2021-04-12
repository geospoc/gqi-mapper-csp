const { Pool } = require('pg');

const pool = new Pool()

export default async (req, res) => {
	if (req.method === 'GET') {
		let taggings = null;
		let users = null;
		let schools = null;
		const campaign = req.query.campaign;
		
		try {
			taggings = await pool.query(`
				SELECT  count(*) FROM crowdsourcing;`);
			users = await pool.query(`
				SELECT  count(*) FROM users;`);
			schools = await pool.query(`
				SELECT COUNT(*) FROM (SELECT DISTINCT school_id FROM crowdsourcing) AS temp;`);
		} catch(e) {
			console.log(e)
		}	


		let output = null;
		if(taggings && users && schools) {
			res.statusCode = 200;
			res.setHeader('Content-Type', 'application/json');
			output = JSON.stringify({
				taggings: taggings.rows[0].count,
				users: users.rows[0].count,
				schools: schools.rows[0].count
			});
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
