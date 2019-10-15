const express = require('express');
const { rejectUnauthenticated } = require('../modules/authentication-middleware');
const { rejectNonAdmin } = require('../modules/isAdminAuthentication-middleware');
const pool = require('../modules/pool');
const router = express.Router();

router.get('/', rejectUnauthenticated, (req, res) => {
    queryText = `SELECT "ConventionNews" FROM "Convention" WHERE "ConventionID" = (SELECT MAX("ConventionID") FROM "Convention");`;
    pool.query(queryText)
        .then(res.send(result.rows))
        .catch(res.sendStatus(500))
})

module.exports = router;