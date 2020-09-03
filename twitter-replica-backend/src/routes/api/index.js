const router = require('express').Router();

// Inject individual routes
router.use('/', require('./user'));
router.use('/user/:usernamePrefix/posts', require('./post'));
router.use('/friendships', require('./friendship'));

module.exports = router;
