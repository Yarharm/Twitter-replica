// Initial setup and properties used throughout application
const path = require('path');
const fs = require('fs');

const mediaPath = path.join(process.cwd(), '/media/');

// Custom setup for necessary infra
const setup = () => {
  if (!fs.existsSync(mediaPath)) {
    fs.mkdirSync(mediaPath);
  }
};

exports.setup = setup;
exports.mediaPath = mediaPath;
