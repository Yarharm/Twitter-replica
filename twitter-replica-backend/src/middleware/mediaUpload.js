const multer = require('multer');
const storage = require('../configs/mediaConfig');

const upload = multer({ storage }).single('media');

module.exports = upload;
