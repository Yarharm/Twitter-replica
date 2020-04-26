const path = require('path');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const mongoConfig = require('./config/databaseConfig');
require('./models/post.model');
const routes = require('./routes');
const properties = require('./properties');

async function bootstrap() {
  const isProduction = process.env.NODE_ENV === 'production';

  const app = express();
  const port = process.env.port || 3333;
  app.use(cors());
  app.use(bodyParser.json());
  app.use(
    properties.mediaPath,
    express.static(path.join(process.cwd(), 'media'))
  );

  // Connect to mongoDB
  if (isProduction) {
    await mongoose.connect(process.env.MONGODB_URI);
  } else {
    try {
      await mongoose.connect(process.env.MONGODB_LOCAL, mongoConfig);
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
  app.listen(port, () => console.log(`Listening on http://localhost:${port}`));
}

bootstrap();
