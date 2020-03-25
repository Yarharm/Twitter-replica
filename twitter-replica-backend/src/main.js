const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

function bootstrap() {
  const app = express();
  const port = process.env.port || 3333;
  app.use(cors());
  app.use(bodyParser.json());

  // Inject routes
  app.use(require("./routes"));

  // Start development server
  app.listen(port, () => console.log("Listening on http://localhost:" + port));
}

bootstrap();
