const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const mongoConfig = require("./config/databaseConfig");

async function bootstrap() {
  var isProduction = process.env.NODE_ENV === "production";

  const app = express();
  const port = process.env.port || 3333;
  app.use(cors());
  app.use(bodyParser.json());

  // Connect to mongoDB
  if (isProduction) {
    await mongoose.connect(process.env.MONGODB_URI);
  } else {
    try {
      await mongoose.connect(process.env.MONGODB_LOCAL, mongoConfig);
      mongoose.set("debug", true);
      console.log("Connected to DB");
    } catch (err) {
      console.error("Connection to DB failed!");
    }
  }

  // Inject mongoose schemas
  require("./models/post.model");

  // Inject routes
  app.use(require("./routes"));

  // Start development server
  app.listen(port, () => console.log("Listening on http://localhost:" + port));
}

bootstrap();
