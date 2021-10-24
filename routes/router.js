/* eslint-disable import/newline-after-import */
const express = require('express');
const router = express.Router();

const trips = require('./api/trips');

router.get('/trips', trips.getCurrentTrips);

module.exports = router;