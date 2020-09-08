require('dotenv').config();
const path = require('path');
const express = require('express');
const RedisServer = require('redis-server');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const mongoConfig = require('./configs/database.config');
require('./models/post.model');
require('./models/user.model');
const routes = require('./routes');
const cache = require('./cache/cache');

async function bootstrap() {
  const isProduction = process.env.NODE_ENV === 'production';

  const app = (module.exports = express());

  const port = process.env.PORT || 3333;
  const redisPort = process.env.REDIS_PORT || 6379;

  app.use(cors());
  app.use(bodyParser.json());

  // Connect to mongoDB
  if (isProduction) {
    await mongoose.connect(process.env.DATABASE_URL, mongoConfig);
  } else {
    try {
      await mongoose.connect(process.env.DATABASE_URL, mongoConfig);
      mongoose.set('debug', true);
      console.log('Connected to DB');
    } catch (err) {
      console.error('Connection to DB failed!');
    }
  }
  // Start Redis server
  const server = new RedisServer(redisPort);
  server.open((err) => {
    if (err === null) {
      console.log('Connected to the Redis server');
    } else {
      console.log('Could not connect to the Redis server');
    }
  });

  // Inject routes
  app.use(routes);

  // Start development server
  app.listen(port, () => {
    console.log(`Listening on http://localhost:${port}`);
  });
}

bootstrap();
