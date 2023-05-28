const express = require('express');
const router = express.Router();
const sitesControllers = require('../app/controllers/SitesControllers');
router.use('/search', sitesControllers.search);
router.use('/', sitesControllers.home);
module.exports = router;
