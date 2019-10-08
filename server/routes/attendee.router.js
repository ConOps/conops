const express = require('express');
const { rejectUnauthenticated } = require('../modules/authentication-middleware');
const pool = require('../modules/pool');
const router = express.Router();

//GET ROUTES
//GET routes are ok for all users to see; GET routes won't need to check authorization. they will check authentication.

//GET route for ALL attendees
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

//GET route for walk-in attendees, not yet checked-in
router.get('/walk_ins', rejectUnauthenticated, async (req, res) => {
    console.log('in attendee walk-in GET route');
    //go get walk-in list of attendees, make sure to grab from current convention!
    const connection = await pool.connect();
    try {
        await connection.query('BEGIN');
        //this will grab the convention ID that is the biggest; ie, the last created convention
        const queryCon = `SELECT MAX("ConventionID") AS convention FROM "Convention";`;
        //save result so we can use it in the followup query
        const result = await connection.query(queryCon);
        //set a variable to the top con ID
        const conventionId = result.rows[0].convention;
        //this query grabs the walk ins; no order ID and not checked in yet
        const queryText = `SELECT * FROM "Attendee" WHERE "ConventionID" = $1 AND "orderID" IS NULL AND "CheckInDate" IS NULL;`;
        //use top con ID to find our attendees for that convention
        const attendeeResult = await connection.query(queryText, [conventionId]);
        await connection.query('COMMIT');
        res.send(attendeeResult.rows);
    } catch (error) {
        await connection.query('ROLLBACK');
        console.log('error in attendee walk-in GET', error);
        res.sendStatus(500);
    } finally {
        connection.release();
    }
});

//GET route for checked-in attendees
router.get('/checked_in', rejectUnauthenticated, async (req, res) => {
    console.log('in attendee checked-in GET route');
    //go get checked-in list of attendees, make sure to grab from current convention!
    const connection = await pool.connect();
    try {
        await connection.query('BEGIN');
        //this will grab the convention ID that is the biggest; ie, the last created convention
        const queryCon = `SELECT MAX("ConventionID") AS convention FROM "Convention";`;
        //save result so we can use it in the followup query
        const result = await connection.query(queryCon);
        //set a variable to the top con ID
        const conventionId = result.rows[0].convention;
        //this query grabs the walk ins; no order ID and not checked in yet
        const queryText = `SELECT * FROM "Attendee" WHERE "ConventionID" = $1 AND "CheckInDate" IS NOT NULL;`;
        //use top con ID to find our attendees for that convention
        const attendeeResult = await connection.query(queryText, [conventionId]);
        await connection.query('COMMIT');
        res.send(attendeeResult.rows);
    } catch (error) {
        await connection.query('ROLLBACK');
        console.log('error in attendee walk-in GET', error);
        res.sendStatus(500);
    } finally {
        connection.release();
    }
});

//GET route for preregistered attendees, not yet checked-in
router.get('/pre_registered', rejectUnauthenticated, async (req, res) => {
    console.log('in attendee checked-in GET route');
    //go get preregistered list of attendees, make sure to grab from current convention!
    const connection = await pool.connect();
    try {
        await connection.query('BEGIN');
        //this will grab the convention ID that is the biggest; ie, the last created convention
        const queryCon = `SELECT MAX("ConventionID") AS convention FROM "Convention";`;
        //save result so we can use it in the followup query
        const result = await connection.query(queryCon);
        //set a variable to the top con ID
        const conventionId = result.rows[0].convention;
        //this query grabs the walk ins; no order ID and not checked in yet
        const queryText = `SELECT * FROM "Attendee" WHERE "ConventionID" = $1 AND "orderID" IS NOT NULL AND "CheckInDate" IS NULL;`;
        //use top con ID to find our attendees for that convention
        const attendeeResult = await connection.query(queryText, [conventionId]);
        await connection.query('COMMIT');
        res.send(attendeeResult.rows);
    } catch (error) {
        await connection.query('ROLLBACK');
        console.log('error in attendee walk-in GET', error);
        res.sendStatus(500);
    } finally {
        connection.release();
    }
});


//GET route for specific attendee ID. no need to check convention; only active convention is visible/clickable on DOM. 
router.get('/details/:id', rejectUnauthenticated, (req, res) => {
    //declare route id as a variable
    const id = req.params.id;
    console.log('in attendee details specific GET for ID:', id);
    //no need for async/await, just grabbing ID
    const queryText = `SELECT * FROM "Attendee" WHERE "AttendeeID" = $1;`;
    pool.query(queryText, [id])
        .then(result => {
            console.log('attendee details:', result.rows[0]);
            res.send(result.rows[0]);
        }).catch(err => {
            console.log('error in attendee detail get:', err);
            res.sendStatus(500);
        })
});

//GET route for an order ID. again, no need to check convention ID; only active convention on DOM.
router.get('/order', rejectUnauthenticated, (req, res) => {
    //sending order ID as an object for this route
    const id = req.body.orderID;
    console.log('in order details specific GET for ID:', id);
    //no need for async/await, just grabbing ID
    const queryText = `SELECT * FROM "Attendee" WHERE "orderID" = $1;`;
    pool.query(queryText, [id])
        .then(result => {
            console.log('attendee order details:', result.rows);
            res.send(result.rows);
        }).catch(err => {
            console.log('error in attendee order get:', err);
            res.sendStatus(500);
        })
});



/**
 * POST route template
 */
router.post('/', (req, res) => {

});

module.exports = router;