require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();

const PORT = process.env.PORT || 3001;

app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

mongoose
  .connect(process.env.MONGO_DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Database connection established");
  })
  .catch((err) => {
    console.log(err);
  });

const authenticationController = require("./controllers/authenticationController");
const inventoryController = require("./controllers/inventoryController");
const globalController = require("./controllers/globalController");

app.use("/", authenticationController, inventoryController, globalController);

app.listen(PORT, () => console.log("listening on port " + PORT));
