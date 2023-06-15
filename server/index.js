const express = require("express");
const app = express();

const PORT = process.env.PORT || 3001;

app.use((req, res, next) => {
  console.log("Incomming request: " + req.url);
  next();
});

app.listen(PORT, () => console.log("listening on port " + PORT));
