require('dotenv').config();
const path = require('path');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const mongoConfig = require('./configs/database.config');
require('./models/post.model');
require('./models/user.model');
const routes = require('./routes');
const properties = require('./properties');

async function bootstrap() {
  const isProduction = process.env.NODE_ENV === 'production';

  const app = (module.exports = express());

  const port = process.env.PORT || 3333;
  app.use(cors());
  app.use(bodyParser.json());
  app.use(
    properties.mediaPath,
    express.static(path.join(process.cwd(), 'media'))
  );

  // Connect to mongoDB
  if (isProduction) {
    await mongoose.connect(process.env.DB_URI_PROD, mongoConfig);
  } else {
    try {
      await mongoose.connect(process.env.DB_URI_DEV, mongoConfig);
      mongoose.set('debug', true);
      console.log('Connected to DB');
    } catch (err) {
      console.error('Connection to DB failed!');
    }
  }

  // Execute custom setup
  properties.setup();

  // Inject routes
  app.use(routes);

  // Start development server
  server = app.listen(port, () => {
    console.log(`Listening on http://localhost:${port}`);
    app.emit('appStarted');
  });
}

bootstrap();
