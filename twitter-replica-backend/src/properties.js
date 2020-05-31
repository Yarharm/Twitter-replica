// Initial setup and properties used throughout application
const mediaPath = `${process.env.AWS_DOMAIN}/${process.env.S3_BUCKET}/`;
const mediaFileNameStrategy = (file) =>
  `${Date.now().toString()}_${file.originalname}`;

exports.mediaPath = mediaPath;
exports.mediaFileName = mediaFileNameStrategy;
