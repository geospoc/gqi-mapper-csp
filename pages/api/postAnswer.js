import { getSession } from 'next-auth/client'

const { Pool } = require('pg')

const pool = new Pool()

export default async (req, res) => {
    const session = await getSession({ req })
    if (session) {
        pool.query(
            'INSERT INTO useranswers(user_id, school_id, result) VALUES($1, $2, $3) RETURNING *',
            [req.body.user_id, req.body.school_id, req.body.result],
            (err, res) => {
                console.log(err ? err.stack : res.rows[0])
            },
        )
        res.statusCode = 200
        res.end()
    }
}
