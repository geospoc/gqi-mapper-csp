import { validate as uuidValidate } from 'uuid'

const { Pool } = require('pg')
const pool = new Pool()

export default async (req, res) => {
    // Allow POST-requests only
    if (req.method !== 'POST') {
        res.statusCode = 405
        res.end()
    }

    const from_uuid = req.body.from_uuid
    const to_uuid = req.body.to_uuid
    console.log('from', from_uuid)
    console.log('to', to_uuid)

    if (!(from_uuid && to_uuid && uuidValidate(from_uuid) && uuidValidate(to_uuid))) {
        res.statusCode = 400
        res.end()
    }

    // TODO: Handle possible duplicates

    const query = 'UPDATE crowdsourcing SET user_id=($2) WHERE user_id=($1) RETURNING *;'

    pool.query(query, [from_uuid, to_uuid])
        .then((result) => {
            res.statusCode = 200
            res.end(JSON.stringify(result.rows))
        })
        .catch((err) => {
            console.log(err.stack)
            res.statusCode = 404
            res.end()
        })
}
