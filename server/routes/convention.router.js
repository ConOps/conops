const express = require('express');
const { rejectUnauthenticated } = require('../modules/authentication-middleware');
const pool = require('../modules/pool');
const router = express.Router();


//GET route
//GET route is only for grabbing current convention
router.get('/', rejectUnauthenticated, (req, res) => {
    console.log('in convention GET route');
    //need to get latest convention, similar to in our attendee routes
    const queryText = `SELECT * FROM "Convention" ORDER BY "ConventionID" DESC LIMIT 1;`;
    pool.query(queryText)
        .then(result => {
            console.log('convention details:', result.rows[0]);
            res.send(result.rows[0]);
        }).catch(err => {
            console.log('error in convention GET route:', err);
            res.sendStatus(500);
        })
});

/**
 * POST route template
 */
router.post('/', (req, res) => {

});

module.exports = router;