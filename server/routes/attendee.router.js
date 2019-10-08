const express = require('express');
const { rejectUnauthenticated } = require('../modules/authentication-middleware');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * GET route template
 */
router.get('/', rejectUnauthenticated, async (req, res) => {
    console.log('in attendee GET route');
    //go get full list of attendees, make sure to grab from current convention!
    const connection = await pool.connect();
    try {
        await connection.query('BEGIN');
        //this will grab the convention ID that is the biggest; ie, the last created convention
        const queryCon = `SELECT MAX("ConventionID") AS convention FROM "Convention";`;
        //save result so we can use it in the followup query
        const result = await connection.query(queryCon);
        //set a variable to the top con ID
        const conventionId = result.rows[0].convention;
        const queryText = `SELECT * FROM "Attendee" WHERE "ConventionID" = $1 ORDER BY "RegistrationDate" ASC;`;
        //use top con ID to find our attendees for that convention
        const attendeeResult = await connection.query(queryText, [conventionId]);
        await connection.query('COMMIT');
        console.log(attendeeResult.rows);
        res.send(attendeeResult.rows);
    } catch (error) {
        await connection.query('ROLLBACK');
        console.log('error in attendee GET', error);
        res.sendStatus(500);
    } finally {
        connection.release();
    }
});

/**
 * POST route template
 */
router.post('/', (req, res) => {

});

module.exports = router;