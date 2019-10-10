const express = require('express');
const { rejectUnauthenticated } = require('../modules/authentication-middleware');
const pool = require('../modules/pool');
const router = express.Router();

router.get('/', rejectUnauthenticated, (req, res) => {
        let queryText = `SELECT * FROM "Location"`
        pool.query(queryText)
            .then((result)  => {
                console.log('in locations GET router:', result);
                res.send(result.rows);
            })
            .catch((error) => {
                console.log('error in locations GET router', error);
            })
});

/**
 * POST route template
 */
router.post('/', (req, res) => {

});

module.exports = router;