const router = require('express').Router();
const accountRoute = require('./account.route')

router.use('/auth',accountRoute)

module.exports = router;