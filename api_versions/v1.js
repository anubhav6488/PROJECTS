const express = require("express");
const router = express.Router();

// Cron Reports
const midnight_cron = require('../jobs/midnight_cron');

// Brands Route

const onboard = require("../routes/onboarding");
const googlelog = require("../routes/googlelog");

// Users

// Scheduled Jobs
router.use('/cron', midnight_cron)

router.use('/onboard', onboard)
router.use('/googles', googlelog)

module.exports = router;
