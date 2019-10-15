const express = require('express');
const { rejectUnauthenticated } = require('../modules/authentication-middleware');
const { rejectNonAdmin } = require('../modules/isAdminAuthentication-middleware');
const pool = require('../modules/pool');
const router = express.Router();



module.exports = router;