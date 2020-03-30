const router = require('express').Router();

// Inject individual routes
router.use('/posts', require('./posts'));

module.exports = router;
