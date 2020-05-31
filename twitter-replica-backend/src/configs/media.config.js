const s3 = require('./aws.config');
const multerS3 = require('multer-s3');
const properties = require('../properties');

const storage = multerS3({
  s3: s3,
  acl: process.env.AWS_BUCKET_POLICY,
  bucket: process.env.S3_BUCKET,
  metadata: function (req, file, cb) {
    cb(null, { fieldName: file.fieldname });
  },
  key: function (req, file, cb) {
    cb(null, properties.mediaFileName(file));
  },
});

module.exports = storage;
