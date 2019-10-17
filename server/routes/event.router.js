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
        const queryText = `SELECT "Event"."EventID", "Event"."ConventionID", "Event"."EventName", "Event"."EventStartTime", "Event"."EventEndTime", "Event"."LocationID", "Location"."LocationName", "Location"."LocationDescription", "Event"."IsCancelled", "Event"."EventDescription", "Event"."SponsorID", "Sponsor"."SponsorName", "Event"."DateCreated", "Event"."DateLastModified", "Event"."EventModifiedNotes", array_remove(array_agg(jsonb_build_object('TagID', "Tags"."TagID", 'TagName', "Tags"."TagName" )), to_jsonb('{"TagID" : null, "TagName" : null}'::json) ) AS "TagObjects", array_remove(array_agg("Tags"."TagName"), NULL) AS "Tags"
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
    const queryText = `SELECT "Event"."EventID", "Event"."ConventionID", "Event"."EventName", "Event"."EventStartTime", "Event"."EventEndTime", "Event"."LocationID", "Location"."LocationName", "Location"."LocationDescription", "Event"."IsCancelled", "Event"."EventDescription", "Event"."SponsorID", "Sponsor"."SponsorName", "Event"."DateCreated", "Event"."DateLastModified", "Event"."EventModifiedNotes", array_remove(array_agg(jsonb_build_object('TagID', "Tags"."TagID", 'TagName', "Tags"."TagName" )), to_jsonb('{"TagID" : null, "TagName" : null}'::json) ) AS "TagObjects", array_remove(array_agg("Tags"."TagName"), NULL) AS "Tags"
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

router.post('/add_event', rejectUnauthenticated, async (req, res) => {
    event = req.body;
    console.log('create new event:', event)
    const connection = await pool.connect();
    try {
        let currentTime
        let EventID
        await connection.query('BEGIN');
        const queryCon = `SELECT MAX("ConventionID") AS convention FROM "Convention";`;
        const result = await connection.query(queryCon);
        const conventionId = result.rows[0].convention;
        const findTime = 'SELECT CURRENT_TIMESTAMP AS time;';
        await connection.query(findTime)
            .then(result => {
                currentTime = result.rows[0].time
            });
        const queryText = `INSERT INTO "Event" ("ConventionID", "EventName", "EventStartTime", "EventEndTime", "LocationID", "EventDescription", "SponsorID", "DateCreated") VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING "Event"."EventID";`
        await connection.query(queryText, [conventionId, event.EventName, event.EventStartTime, event.EventEndTime, event.LocationID, event.EventDescription, event.SponsorID, currentTime])
            .then(result => {
                EventID = result.rows[0].EventID
                console.log('new event id', EventID);
                
            })
        
        // console.log('event result!!', eventResult);
        console.log('event tags:', event.TagName);
        let tagsToAdd = event.TagName;
        if (tagsToAdd === null || tagsToAdd === undefined) {
            tagsToAdd = []
        }

        const insertTagsText = `INSERT INTO "EventTags" ("Event_ID", "Tag_ID")
                                VALUES ($1, $2);`;
        
        for (let tag of tagsToAdd) {
            await connection.query(insertTagsText, [EventID, tag.TagID])
        }
        await connection.query('COMMIT');
        // console.log(eventResult.rows);
        res.sendStatus(201);
    } catch (error) {
        await connection.query('ROLLBACK');
        console.log('error in event post:', error);
        res.sendStatus(500);
    } finally {
        connection.release();
    }
    
})

//PUT routes
//PUT route for event uncancel
router.put('/event_uncancel', rejectUnauthenticated, rejectNonEventOrganizer, (req, res) => {
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
router.put('/event_cancel', rejectUnauthenticated, rejectNonEventOrganizer, (req, res) => {
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

//PUT for event update

router.put('/event_update', rejectUnauthenticated, rejectNonEventOrganizer, async (req, res) => {

    console.log('event update data:', req.body);
    const connection = await pool.connect();
    try {
        let currentTime
        await connection.query('BEGIN');
        const eventUpdate = req.body;
        console.log('event to update:', eventUpdate);
        
        
        const queryText = `UPDATE "Event"
                        SET "EventName" = $1, "EventDescription" = $2, "EventStartTime" = $3, "EventEndTime" = $4, "DateLastModified" = $5, "EventModifiedNotes" = $6, "SponsorID" = $7, "LocationID" = $8
                        WHERE "EventID" = $9;`;
        const findTime = `SELECT CURRENT_TIMESTAMP AS time;`;
        await connection.query(findTime)
            .then(result => {
                currentTime = result.rows[0].time
            });
        await connection.query(queryText, [eventUpdate.EventName, eventUpdate.EventDescription, eventUpdate.EventStartTime, eventUpdate.EventEndTime, currentTime, eventUpdate.EventModifiedNotes, eventUpdate.SponsorID, eventUpdate.LocationID, eventUpdate.EventID] )
        const tagsToAdd = eventUpdate.Tags;
        //need to update tags.. this is a shotgun approach; we're removing all event tags here, then saving all that we get the client
        const tagsDeleteText = `DELETE FROM "EventTags" WHERE "Event_ID" = $1;`;
        await connection.query(tagsDeleteText, [eventUpdate.EventID]);
        const tagsInsertText = `INSERT INTO "EventTags" ("Event_ID", "Tag_ID")
                                VALUES ($1, $2);`;
        for (let i = 0; i < eventUpdate.TagObjects.length; i++) {
            await connection.query(tagsInsertText, [eventUpdate.EventID, eventUpdate.TagObjects[i].TagID])
        }
        await connection.query('COMMIT');
        res.sendStatus(200);
    } catch(error) {
        console.log('error in event update PUT', error);
        res.sendStatus(500);
    } finally {
        connection.release();
    }
    
})


/**
 * POST route template
 */
router.post('/', (req, res) => {

});

module.exports = router;