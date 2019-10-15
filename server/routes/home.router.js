const express = require('express');
const { rejectUnauthenticated } = require('../modules/authentication-middleware');
const { rejectNonAdmin } = require('../modules/isAdminAuthentication-middleware');
const pool = require('../modules/pool');
const router = express.Router();

router.get('/', rejectUnauthenticated, (req, res) => {
    queryText = `SELECT "ConventionNews" FROM "Convention" WHERE "ConventionID" = (SELECT MAX("ConventionID") FROM "Convention");`;
    pool.query(queryText)
        .then((results) => {
            console.log('results from news GET', results.rows[0]);
            res.send(results.rows[0]);
        })
        .catch((error) => {
            console.log('error in news GET route', error);
            res.sendStatus(500);
        })
})

module.exports = router;