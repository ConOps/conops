const express = require('express');
const { rejectUnauthenticated } = require('../modules/authentication-middleware');
const { rejectNonAdmin } = require('../modules/isAdminAuthentication-middleware');
const pool = require('../modules/pool');
const router = express.Router();

router.get('/', rejectUnauthenticated, (req, res) => {
    let queryText = `SELECT * FROM "Sponsor"`
    pool.query(queryText)
        .then((result) => {
            console.log('in sponsors GET router:', result);
            res.send(result.rows);
        })
        .catch((error) => {
            console.log('error in sponsors GET router:', error)
        })
})

module.exports = router;