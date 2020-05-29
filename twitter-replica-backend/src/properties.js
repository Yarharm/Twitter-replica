// Initial setup and properties used throughout application
const path = require('path');
const fs = require('fs');

const mediaPath = path.join(process.cwd(), '/media/');

const generateUrl = (req) => {
  const url = `${req.protocol}://${req.get('host')}`;
  return url;
};

// Custom setup for necessary infra
const setup = () => {
  if (!fs.existsSync(mediaPath)) {
    fs.mkdirSync(mediaPath);
  }
};

exports.setup = setup;
exports.mediaPath = mediaPath;
exports.generateUrl = generateUrl;
