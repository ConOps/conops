const express = require('express');
const { rejectUnauthenticated } = require('../modules/authentication-middleware');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * GET route template
 */
router.get('/', rejectUnauthenticated, (req, res) => {
    res.send('hellooooooo!');
});

/**
 * POST route template
 */
router.post('/', (req, res) => {

});

module.exports = router;