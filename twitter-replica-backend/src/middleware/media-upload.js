const multer = require('multer');
const storage = require('../configs/media.config');

const uploadPost = multer({ storage }).single('media');
const uploadUser = multer({ storage }).fields([
  { name: 'avatar', maxCount: 1 },
  { name: 'coverImage', maxCount: 1 },
]);

exports.uploadUser = uploadUser;
exports.uploadPost = uploadPost;
