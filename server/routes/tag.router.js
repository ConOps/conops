const express = require('express');
const { rejectUnauthenticated } = require('../modules/authentication-middleware');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * GET route template
 */
router.get('/', rejectUnauthenticated, (req, res) => {
    let queryText = `SELECT * FROM "Tags";`;
    pool.query(queryText)
        .then((results) => {
            console.log('In Tag get router', results);
            res.send(results.rows);
        })
        .catch((error) => {
            console.log('error in Tag get router ', error);
            res.sendStatus(500);
        })
});

/**
 * POST route template
 */
router.post('/', (req, res) => {

});

module.exports = router;