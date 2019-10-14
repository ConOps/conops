const express = require('express');
const { rejectUnauthenticated } = require('../modules/authentication-middleware');
const { rejectNonEventOrganizer } = require('../modules/isEventOrganizerAuthentication-middleware');
const pool = require('../modules/pool');
const router = express.Router();

// get all the events for the current convention
router.get('/', rejectUnauthenticated, async (req, res) => {
    console.log('in event GET route')
    const connection = await pool.connect();
    try {
        await connection.query('BEGIN');
        const queryCon = `SELECT MAX ("ConventionID") AS convention from "Convention";`;
        const result = await connection.query(queryCon);
        const conventionID = result.rows[0].convention;
        //below query grabs all events and the necessary info tied to each event. the array_agg will grab all tags and throw into an array, the array_remove removes all nulls from that (only applicable for events without any tags).
        const queryText = `SELECT "Event"."EventID", "Event"."ConventionID", "Event"."EventName", "Event"."EventStartTime", "Event"."EventEndTime", "Location"."LocationName", "Location"."LocationDescription", "Event"."IsCancelled", "Event"."EventDescription", "Sponsor"."SponsorName", "Event"."DateCreated", "Event"."DateLastModified", "Event"."EventModifiedNotes", array_remove(array_agg("Tags"."TagName"), NULL) AS "Tags" 
                            FROM "Event"
                            LEFT OUTER JOIN "Location" ON "Location"."LocationID" = "Event"."LocationID"
                            LEFT OUTER JOIN "Sponsor" ON "Sponsor"."SponsorID" = "Event"."SponsorID"
                            LEFT JOIN "EventTags" ON "EventTags"."Event_ID" = "Event"."EventID"
                            LEFT JOIN "Tags" ON "Tags"."TagID" = "EventTags"."Tag_ID"
                            WHERE "ConventionID" = $1
                            GROUP BY "Event"."EventID", "Event"."EventName", "Location"."LocationName", "Location"."LocationDescription", "Sponsor"."SponsorName"
                            ORDER BY "Event"."EventStartTime";`;
        const eventResult = await connection.query(queryText, [conventionID]);
        await connection.query('COMMIT');
        console.log(eventResult.rows);
        res.send(eventResult.rows);
    } catch (error) {
        await connection.query('ROLLBACK');
        console.log('error in event GET', error)
        res.sendStatus(500);
    } finally {
        connection.release();
    }
});

// get information for a specific event
router.get('/eventdetails/:id', rejectUnauthenticated, (req, res) => {
    const id = req.params.id;
    console.log('in event details GET')
    const queryText = `SELECT "Event"."EventID", "Event"."ConventionID", "Event"."EventName", "Event"."EventStartTime", "Event"."EventEndTime", "Location"."LocationName", "Location"."LocationDescription", "Event"."IsCancelled", "Event"."EventDescription", "Sponsor"."SponsorName", "Event"."DateCreated", "Event"."DateLastModified", "Event"."EventModifiedNotes", array_remove(array_agg("Tags"."TagName"), NULL) AS "Tags" 
                            FROM "Event"
                            LEFT OUTER JOIN "Location" ON "Location"."LocationID" = "Event"."LocationID"
                            LEFT OUTER JOIN "Sponsor" ON "Sponsor"."SponsorID" = "Event"."SponsorID"
                            LEFT JOIN "EventTags" ON "EventTags"."Event_ID" = "Event"."EventID"
                            LEFT JOIN "Tags" ON "Tags"."TagID" = "EventTags"."Tag_ID"
                            WHERE "Event"."EventID" = $1
                            GROUP BY "Event"."EventID", "Event"."EventName", "Location"."LocationName", "Location"."LocationDescription", "Sponsor"."SponsorName"
                            ORDER BY "Event"."EventStartTime";`;
    pool.query(queryText, [id])
        .then(result => {
            console.log('event details:', result.rows[0]);
            res.send(result.rows[0]);
        }).catch(error => {
            console.log('error in event details router:', error)
            res.sendStatus(500);
        })
});

//PUT routes
//PUT route for event uncancel
router.put('/event_uncancel', rejectUnauthenticated, (req, res) => {
    const id = req.body.eventToUncancel
    console.log('in event uncancel PUT');
    const queryText = `UPDATE "Event"
                        SET "IsCancelled" = FALSE
                        WHERE "EventID" = $1;`;
    pool.query(queryText, [id])
        .then(result => {
            res.sendStatus(200);
        }).catch(error => {
            console.log('error in event uncancel PUT', error);
            res.sendStatus(500);
        })
})

//PUT for event cancel
router.put('/event_cancel', rejectUnauthenticated, (req, res) => {
    const id = req.body.eventToUncancel
    console.log('in event cancel PUT');
    const queryText = `UPDATE "Event"
                        SET "IsCancelled" = TRUE
                        WHERE "EventID" = $1;`;
    pool.query(queryText, [id])
        .then(result => {
            res.sendStatus(200);
        }).catch(error => {
            console.log('error in event cancel PUT', error);
            res.sendStatus(500);
        })
})


/**
 * POST route template
 */
router.post('/', (req, res) => {

});

module.exports = router;