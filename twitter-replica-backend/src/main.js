const express = require("express");

function bootstrap() {
  const app = express();
  const port = process.env.port || 3333;

  app.listen(port, () => console.log("Listening on http://localhost:" + port));
}

bootstrap();
