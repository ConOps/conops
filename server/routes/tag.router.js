const express = require('express');
const { rejectUnauthenticated } = require('../modules/authentication-middleware');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * GET route template
 */
//Grabs all of the tags from the DB and sends them client side
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

//Grabs a specific tag and sends it client side
router.get('/details/:id', rejectUnauthenticated, (req, res) => {
    const id = req.params.id;
    const queryText = `SELECT * FROM "Tags"
                     WHERE "TagID" = $1;`;
    pool.query(queryText, [id])
        .then(result => {
            console.log('Tags details:', result.rows);
            res.send(result.rows[0]);
        }).catch(err => {
            console.log('error in Tag details get:', err);
            res.sendStatus(500);
        })
})

router.put('/edit/:id', rejectUnauthenticated, (req, res) => {
   
   
    console.log('in TAGS PUT route, req.body:', req.body);
   
  
    const queryText = `UPDATE "Tags" SET "TagName" = $1 WHERE "TagID" = $2`
    pool.query(queryText, [req.body.TagName, req.params.id])
        .then(result => {
            res.send(201);
        })
        .catch( error => {
            console.log('error in Server side editTag', error);
            res.sendStatus(500)
        })
})

/**
 * POST route template
 */
router.post('/', (req, res) => {

});

module.exports = router;