const router = require('express').Router();

// Inject individual routes
router.use('/', require('./user'));
router.use('/user/:usernamePrefix/posts', require('./post'));

module.exports = router;
