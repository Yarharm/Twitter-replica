const router = require('express').Router();

// Inject individual routes
router.use('', require('./user'));
router.use('/posts', require('./posts'));

module.exports = router;
